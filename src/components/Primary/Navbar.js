'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50 text-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-green-600" onClick={closeMenu}>
              Makhana Store
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
              <Link href="/products" className="hover:text-green-600 transition-colors">Products</Link>
              <Link href="/about" className="hover:text-green-600 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-green-600 transition-colors">Contact</Link>
            </div>

            {/* Desktop Auth & Cart */}
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

            {/* Mobile Menu Button & Cart */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Mobile Cart */}
              <Link href="/cart" className="hover:text-green-600 transition-colors">
                🛒
              </Link>

              {/* Hamburger Menu Button */}
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600 transition-colors"
                aria-label="Toggle menu"
              >
                <svg 
                  className={`w-6 h-6 transform transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu - FIXED VERSION */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="py-4">
                {/* Mobile Navigation Links */}
                <div className="flex flex-col space-y-2 mb-6">
                  <Link 
                    href="/" 
                    className="text-gray-700 hover:text-green-600 transition-colors py-3 px-4 rounded hover:bg-green-50"
                    onClick={closeMenu}
                  >
                    🏠 Home
                  </Link>
                  <Link 
                    href="/products" 
                    className="text-gray-700 hover:text-green-600 transition-colors py-3 px-4 rounded hover:bg-green-50"
                    onClick={closeMenu}
                  >
                    📦 Products
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-gray-700 hover:text-green-600 transition-colors py-3 px-4 rounded hover:bg-green-50"
                    onClick={closeMenu}
                  >
                    ℹ️ About
                  </Link>
                  <Link 
                    href="/contact" 
                    className="text-gray-700 hover:text-green-600 transition-colors py-3 px-4 rounded hover:bg-green-50"
                    onClick={closeMenu}
                  >
                    📞 Contact
                  </Link>
                </div>

                {/* Mobile Cart */}
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <Link 
                    href="/cart" 
                    className="flex items-center text-gray-700 hover:text-green-600 transition-colors py-3 px-4 rounded hover:bg-green-50"
                    onClick={closeMenu}
                  >
                    🛒 Shopping Cart (0)
                  </Link>
                </div>

                {/* Mobile Auth Section */}
                <div className="border-t border-gray-200 pt-4">
                  {status === 'loading' ? (
                    <div className="animate-pulse bg-gray-200 h-10 w-full rounded mx-4"></div>
                  ) : session ? (
                    <div className="space-y-3">
                      <div className="flex items-center py-2 px-4">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-600 font-bold text-sm">
                            {session.user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-gray-700 font-medium">Hi, {session.user.name}</p>
                          <p className="text-gray-500 text-xs">{session.user.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 px-4">
                        <Link 
                          href="/profile" 
                          className="text-gray-700 hover:text-green-600 transition-colors py-2 px-2 rounded hover:bg-green-50"
                          onClick={closeMenu}
                        >
                          👤 My Profile
                        </Link>
                        <Link 
                          href="/orders" 
                          className="text-gray-700 hover:text-green-600 transition-colors py-2 px-2 rounded hover:bg-green-50"
                          onClick={closeMenu}
                        >
                          📋 My Orders
                        </Link>
                        <button
                          onClick={() => {
                            signOut({ callbackUrl: '/' })
                            closeMenu()
                          }}
                          className="bg-red-600 text-white px-4 py-3 rounded hover:bg-red-700 transition-colors w-full text-left mt-2"
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2 px-4">
                      <Link 
                        href="/auth/login" 
                        className="bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 transition-colors text-center"
                        onClick={closeMenu}
                      >
                        🔑 Login
                      </Link>
                      <Link 
                        href="/auth/signup" 
                        className="border-2 border-green-600 text-green-600 px-4 py-3 rounded hover:bg-green-600 hover:text-white transition-colors text-center"
                        onClick={closeMenu}
                      >
                        📝 Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Backdrop Overlay - FIXED VERSION */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={closeMenu}
          style={{ top: '76px' }} // Start below the navbar
        ></div>
      )}
    </>
  )
}
