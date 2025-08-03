import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import sql from '../../../../lib/db'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const users = await sql`
            SELECT id, name, email, password_hash, role 
            FROM users 
            WHERE email = ${credentials.email.toLowerCase()}
          `

          if (!users || users.length === 0) {
            return null
          }

          const user = users[0]
          const isValidPassword = await bcrypt.compare(
            credentials.password, 
            user.password_hash
          )

          if (!isValidPassword) {
            return null
          }

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    }
  },

  pages: {
    signIn: '/auth/login',
  },

  session: {
    strategy: 'jwt'
  },

  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
