// src/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import pool from '../../../../lib/db'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    // Email/Password Authentication
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          // Find user in database
          const { rows } = await pool.query(
            'SELECT id, name, email, password_hash, role FROM users WHERE email = $1',
            [credentials.email]
          )

          if (rows.length === 0) {
            return null
          }

          const user = rows[0]

          // Verify password
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
    }),

    // Google Authentication (optional)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
      session.user.id = token.sub
      session.user.role = token.role
      return session
    },
    async signIn({ user, account, profile }) {
      // Handle Google sign-in - create user in database if needed
      if (account.provider === 'google') {
        try {
          const { rows } = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [user.email]
          )

          if (rows.length === 0) {
            // Create new user for Google sign-in
            await pool.query(
              'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)',
              [user.name, user.email, 'google_auth', 'customer']
            )
          }
          return true
        } catch (error) {
          console.error('Google sign-in error:', error)
          return false
        }
      }
      return true
    }
  },

  pages: {
    signIn: '/auth/login',
    signUp: '/auth/register',
  },

  session: {
    strategy: 'jwt'
  }
})

export { handler as GET, handler as POST }
