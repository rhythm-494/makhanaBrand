'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 text-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-green-600">
            Makhana Store
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
            <Link href="/products" className="hover:text-green-600 transition-colors">Products</Link>
            <Link href="/about" className="hover:text-green-600 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-green-600 transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="hover:text-green-600 transition-colors">
              🛒 Cart (0)
            </Link>
            
            {status === 'loading' ? (
              <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700">Hi, {session.user.name}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/auth/login" 
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
