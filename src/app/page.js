import Image from 'next/image'
import HeroSection from '../components/Hero/HeroSection'
import ProductsSection from '../components/products/ProductsSection'

import { productService } from '../services/database/productService'
import { categoryService } from '../services/database/categoryService'
import { statsService } from '../services/database/statsService'
import { userService } from '../services/database/userService'
import { orderService } from '../services/database/orderService'

export const metadata = {
  title: 'Home - Makhana Store | Premium Quality Natural Snacks',
  description: 'Welcome to Makhana Store. Discover premium quality makhana directly from Bihar\'s finest farms. Healthy, crunchy, and natural lotus seeds with no preservatives.',
  keywords: 'makhana, lotus seeds, healthy snacks, Bihar, organic, natural',
  openGraph: {
    title: 'Makhana Store - Premium Quality Natural Snacks',
    description: 'Fresh, healthy makhana directly from Bihar\'s finest farms',
    type: 'website',
  },
}

export default async function HomePage() {
  let featuredProducts = []
  let trendingProducts = []
  let categories = []
  let stats = {
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0
  }
  let recentCustomers = []
  let recentOrders = []
  
  try {
    console.log('🔄 Fetching homepage data...')

    // Fetch all data in parallel for better performance
    const [
      featuredProductsData,
      trendingProductsData,
      categoriesData,
      statsData,
      recentCustomersData,
      recentOrdersData
    ] = await Promise.all([
      productService.getFeaturedProducts(8),
      productService.getTrendingProducts(6),
      categoryService.getAllCategories(6),
      statsService.getHomepageStats(),
      userService.getRecentCustomers(5),
      orderService.getRecentOrders(5)
    ])

    featuredProducts = featuredProductsData
    trendingProducts = trendingProductsData
    categories = categoriesData
    stats = statsData
    recentCustomers = recentCustomersData
    recentOrders = recentOrdersData
    
    console.log('✅ Homepage data fetched successfully:', {
      featuredProducts: featuredProducts.length,
      trendingProducts: trendingProducts.length,
      categories: categories.length,
      stats,
      recentCustomers: recentCustomers.length,
      recentOrders: recentOrders.length
    })
    
  } catch (error) {
    console.error('❌ Error fetching homepage data:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Enhanced Stats */}
      <HeroSection 
        stats={stats}
        recentActivity={{
          newCustomers: recentCustomers.length,
          recentOrders: recentOrders.length
        }}
      />
      
      {/* Featured Products Section with Functional Category Filters */}
      <ProductsSection 
        products={featuredProducts} 
        categories={categories}
        title="Our Premium Makhana Collection"
        subtitle="Discover our handpicked selection of the finest makhana varieties, sourced directly from Bihar&apos;s traditional farmers."
        showViewAll={true}
      />

      {/* Enhanced Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of makhana varieties, each carefully crafted for unique taste experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🏷️</div>
                <p className="text-gray-500 text-lg">Categories will be displayed here soon!</p>
              </div>
            ) : (
              categories.map(category => (
                <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 overflow-hidden">
                    <Image 
                      src={category.image_url || '/images/category-placeholder.jpg'} 
                      alt={category.name}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {category.product_count || 0} products
                      </span>
                      <a 
                        href={`/products?category=${category.id}`}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
 
      
      {/* Enhanced Why Choose Us Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Makhana?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are committed to bringing you the highest quality makhana with complete transparency in our process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">100% Natural</h3>
              <p className="text-gray-600 text-sm">No artificial preservatives or chemicals added</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-5xl mb-4">🚜</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Farm Fresh</h3>
              <p className="text-gray-600 text-sm">Directly sourced from Bihar&apos;s finest farmers</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-5xl mb-4">💪</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">High Protein</h3>
              <p className="text-gray-600 text-sm">Rich in protein and low in calories</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Quick delivery across India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Numbers Speak</h2>
            <p className="text-gray-600">Growing community of makhana lovers across India</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-4xl font-bold text-green-600 mb-2 counter-animation">
                {stats.totalProducts}+
              </div>
              <p className="text-gray-700 font-medium">Premium Products</p>
              <p className="text-gray-500 text-xs mt-1">Varieties Available</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2 counter-animation">
                {stats.totalCustomers}+
              </div>
              <p className="text-gray-700 font-medium">Happy Customers</p>
              <p className="text-gray-500 text-xs mt-1">Satisfied Buyers</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-2 counter-animation">
                {stats.totalOrders}+
              </div>
              <p className="text-gray-700 font-medium">Orders Delivered</p>
              <p className="text-gray-500 text-xs mt-1">Successfully Completed</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-4xl font-bold text-yellow-600 mb-2 counter-animation">
                ₹{stats.totalRevenue.toLocaleString()}+
              </div>
              <p className="text-gray-700 font-medium">Revenue Generated</p>
              <p className="text-gray-500 text-xs mt-1">Business Growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">Real feedback from our satisfied customers across India</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-green-500">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                &quot;Amazing quality makhana! Fresh, crunchy and so much better than store-bought ones. The packaging keeps them fresh for weeks. Will definitely order again!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold">P</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Priya Sharma</p>
                  <p className="text-gray-500 text-sm">Delhi</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                &quot;Perfect snack for my fitness journey. High protein, low calories, and tastes fantastic! The masala flavor is my absolute favorite.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">R</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Rajesh Kumar</p>
                  <p className="text-gray-500 text-sm">Mumbai</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-purple-500">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                &quot;Love the variety of flavors! Great packaging, fast delivery, and excellent customer service. My entire family enjoys these healthy snacks.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-bold">A</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Anita Patel</p>
                  <p className="text-gray-500 text-sm">Bangalore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Our Latest Offers</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter and get exclusive deals, new product launches, and healthy recipes
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300 placeholder-gray-500"
              />
              <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm mt-3 opacity-80">
              Join 10,000+ subscribers • No spam, unsubscribe anytime
            </p>
          </div>
        </div>
      </section>
      
      {/* Enhanced Call to Action Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Ready to Try Our Premium Makhana?</h2>
          <p className="text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust us for their healthy snacking needs. Experience the authentic taste of Bihar&apos;s finest makhana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/products" 
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
            >
              🛍️ Shop All Products
            </a>
            <a 
              href="/contact" 
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-200"
            >
              📞 Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
