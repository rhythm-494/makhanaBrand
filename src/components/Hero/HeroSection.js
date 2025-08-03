import Link from 'next/link'

export default function HeroSection({ stats }) {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Premium <span className="text-green-600">Makhana</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Healthy, crunchy, and natural lotus seeds directly from Bihar's finest farms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/products" 
                className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors text-center"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
