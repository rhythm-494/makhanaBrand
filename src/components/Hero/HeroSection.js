'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function HeroSection({ stats, recentActivity }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Animation on mount
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Auto-slide testimonials
  const testimonials = [
    { text: "Best makhana I've ever tasted!", author: "Priya S." },
    { text: "Fresh from Bihar farms to my table", author: "Rajesh K." },
    { text: "Healthy snacking made delicious", author: "Anita P." }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Enhanced Background with Animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-green-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-400 rounded-full opacity-10 animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content Section */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            {/* Premium Badge */}
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fadeIn">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              100% Natural & Farm Fresh
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Premium <span className="text-green-600 relative">
                Makhana
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-600 rounded-full opacity-30"></div>
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              Healthy, crunchy, and natural lotus seeds directly from Bihar&apos;s finest farms. 
              <span className="text-green-600 font-semibold"> Rich in protein, low in calories</span> - 
              the perfect guilt-free snack for health-conscious families.
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm">🌱</span>
                </div>
                <span className="text-gray-700 font-medium">100% Organic</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm">💪</span>
                </div>
                <span className="text-gray-700 font-medium">High Protein</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm">🚚</span>
                </div>
                <span className="text-gray-700 font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm">❤️</span>
                </div>
                <span className="text-gray-700 font-medium">Heart Healthy</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                href="/products" 
                className="group bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="mr-2">🛍️</span>
                Shop Now
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
              </Link>
              
              <Link 
                href="/about" 
                className="group border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-600 hover:text-white transition-all duration-300 text-center"
              >
                <span className="mr-2">📖</span>
                Our Story
              </Link>
            </div>

            {/* Customer Testimonial Slider */}
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-green-100">
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  ⭐⭐⭐⭐⭐
                </div>
                <div className="text-sm text-gray-600">
                  "{testimonials[currentSlide].text}" - {testimonials[currentSlide].author}
                </div>
              </div>
              <div className="flex mt-2 space-x-1">
                {testimonials.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === currentSlide ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Visual Section */}
          <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            
            {/* Main Product Image */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-green-100 to-green-200 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/hero-makhana.jpg" 
                  alt="Premium Makhana Collection"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Stats Cards */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-green-600">{stats?.totalProducts || 0}+</div>
                  <div className="text-sm text-gray-600">Premium Varieties</div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats?.totalCustomers || 0}+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>

                {/* Live Activity Indicator */}
                {recentActivity && recentActivity.recentOrders > 0 && (
                  <div className="absolute top-1/2 left-6 bg-red-500 text-white px-3 py-2 rounded-full text-xs font-medium animate-pulse">
                    🔥 {recentActivity.recentOrders} recent orders!
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full opacity-30 animate-pulse"></div>
            </div>

            {/* Product Showcase Cards */}
            <div className="absolute -left-8 top-1/4 bg-white p-3 rounded-lg shadow-lg border-l-4 border-green-500 animate-fadeInUp">
              <div className="text-xs text-gray-500">Featured Product</div>
              <div className="font-semibold text-sm">Masala Makhana</div>
              <div className="text-green-600 font-bold">₹299</div>
            </div>

            <div className="absolute -right-8 bottom-1/4 bg-white p-3 rounded-lg shadow-lg border-l-4 border-blue-500 animate-fadeInUp delay-500">
              <div className="text-xs text-gray-500">Best Seller</div>
              <div className="font-semibold text-sm">Plain Roasted</div>
              <div className="text-blue-600 font-bold">₹249</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`mt-16 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-8">
            <p className="text-gray-600 text-sm mb-4">Trusted by thousands of health-conscious families</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              
              {/* Trust Badges */}
              <div className="text-center">
                <div className="text-2xl mb-2">🏆</div>
                <div className="text-xs text-gray-600">Premium Quality</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl mb-2">🌿</div>
                <div className="text-xs text-gray-600">Organic Certified</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl mb-2">🚛</div>
                <div className="text-xs text-gray-600">Free Shipping</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl mb-2">💯</div>
                <div className="text-xs text-gray-600">100% Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-green-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-green-600 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </section>
  )
}
