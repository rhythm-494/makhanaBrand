import HeroSection from '../components/Hero/HeroSection'
import ProductsSection from '../components/products/ProductsSection'
import CategoriesSection from '../components/categories/CategoriesSection'
import TestimonialsSection from '../components/testimonials/TestimonialsSection'
import NewsletterSection from '../components/newsletter/NewsletterSection'

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
      
      {/* Featured Products Section */}
      <ProductsSection 
        products={featuredProducts} 
        title="Our Premium Makhana Collection"
        subtitle="Discover our handpicked selection of the finest makhana varieties, sourced directly from Bihar&apos;s traditional farmers."
        showViewAll={true}
      />

      {/* Categories Section */}
      <CategoriesSection 
        categories={categories}
        title="Shop by Category"
        subtitle="Explore our diverse range of makhana varieties"
      />

      {/* Trending Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Trending Now</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Popular choices among our customers - limited stock available!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border relative">
                {product.stock_qty < 20 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                    Only {product.stock_qty} left!
                  </span>
                )}
                
                <div className="relative h-48 bg-gray-200">
                  <img 
                    src={product.image_url || '/images/placeholder-makhana.jpg'} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {product.weight}g
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded text-sm hover:bg-green-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Makhana?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are committed to bringing you the highest quality makhana with complete transparency in our process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-lg font-semibold mb-2">100% Natural</h3>
              <p className="text-gray-600 text-sm">No artificial preservatives or chemicals</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🚜</div>
              <h3 className="text-lg font-semibold mb-2">Farm Fresh</h3>
              <p className="text-gray-600 text-sm">Directly sourced from Bihar farmers</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-lg font-semibold mb-2">High Protein</h3>
              <p className="text-gray-600 text-sm">Rich in protein and low in calories</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
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
            <p className="text-gray-600">Growing community of makhana lovers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.totalProducts}+
              </div>
              <p className="text-gray-600 font-medium">Premium Products</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.totalCustomers}+
              </div>
              <p className="text-gray-600 font-medium">Happy Customers</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.totalOrders}+
              </div>
              <p className="text-gray-600 font-medium">Orders Delivered</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">
                ₹{stats.totalRevenue.toLocaleString()}+
              </div>
              <p className="text-gray-600 font-medium">Revenue Generated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">Real feedback from our satisfied customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &quot;Amazing quality makhana! Fresh, crunchy and so much better than store-bought ones. Will definitely order again!&quot;
              </p>
              <p className="font-semibold text-gray-800">- Priya Sharma</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &quot;Perfect snack for my fitness journey. High protein, low calories, and tastes fantastic!&quot;
              </p>
              <p className="font-semibold text-gray-800">- Rajesh Kumar</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &quot;Love the variety of flavors! The masala makhana is my favorite. Great packaging and fast delivery.&quot;
              </p>
              <p className="font-semibold text-gray-800">- Anita Patel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Our Latest Offers</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter and get exclusive deals on premium makhana
          </p>
          
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Try Our Premium Makhana?</h2>
          <p className="text-xl mb-8 text-gray-600">
            Join thousands of satisfied customers who trust us for their healthy snacking needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/products" 
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Shop All Products
            </a>
            <a 
              href="/contact" 
              className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
