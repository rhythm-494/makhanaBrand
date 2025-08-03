import './globals.css'
import Navbar from '../components/Primary/Navbar'
import Footer from '../components/Primary/Footer'
import SessionProvider from '../components/auth/SessionProvider'
import { getServerSession } from 'next-auth'

export const metadata = {
  title: 'Makhana Store - Premium Quality Natural Snacks',
  description: 'Fresh, healthy, and delicious makhana directly from farmers',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <SessionProvider session={session}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
