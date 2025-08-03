import pool from '../lib/db'
import HeroSection from '../components/Hero/HeroSection'
import ProductsSection from '../components/products/ProductsSection'

// Metadata for the homepage
export const metadata = {
  title: 'Home - Makhana Store | Premium Quality Natural Snacks',
  description: 'Welcome to Makhana Store. Discover premium quality makhana directly from Bihar\'s finest farms. Healthy, crunchy, and natural lotus seeds with no preservatives.',
}

export default async function HomePage() {
  let featuredProducts = []
  let categories = []
  let stats = {
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0
  }
  
  try {
    // Fetch featured products from database
    const { rows: products } = await pool.query(
      `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.is_active = true 
       ORDER BY p.created_at DESC 
       LIMIT 8`
    )
    
    // Fetch categories from database
    const { rows: cats } = await pool.query(
      'SELECT * FROM categories ORDER BY created_at ASC LIMIT 6'
    )
    
    // Fetch some stats for display
    const { rows: productCount } = await pool.query(
      'SELECT COUNT(*) as count FROM products WHERE is_active = true'
    )
    
    const { rows: customerCount } = await pool.query(
      'SELECT COUNT(*) as count FROM users WHERE role = $1',
      ['customer']
    )
    
    const { rows: orderCount } = await pool.query(
      'SELECT COUNT(*) as count FROM orders'
    )
    
    featuredProducts = products
    categories = cats
    stats = {
      totalProducts: productCount[0]?.count || 0,
      totalCustomers: customerCount[0]?.count || 0,
      totalOrders: orderCount[0]?.count || 0
    }
    
  } catch (error) {
    console.error('Database error:', error)
    // Fallback to empty arrays if database fails
    featuredProducts = []
    categories = []
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection stats={stats} />
      
      {/* Featured Products Section */}
      <ProductsSection 
        products={featuredProducts} 
        categories={categories}
        title="Our Premium Makhana Collection"
        subtitle="Discover our handpicked selection of the finest makhana varieties, sourced directly from Bihar's traditional farmers."
      />
      
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
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-lg font-semibold mb-2">100% Natural</h3>
              <p className="text-gray-600 text-sm">No artificial preservatives or chemicals</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🚜</div>
              <h3 className="text-lg font-semibold mb-2">Farm Fresh</h3>
              <p className="text-gray-600 text-sm">Directly sourced from Bihar farmers</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-lg font-semibold mb-2">High Protein</h3>
              <p className="text-gray-600 text-sm">Rich in protein and low in calories</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Quick delivery across India</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Try Our Premium Makhana?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust us for their healthy snacking needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/products" 
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop All Products
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
