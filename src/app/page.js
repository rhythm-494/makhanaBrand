import sql from '../lib/db'
import HeroSection from '../components/Hero/HeroSection'
import ProductsSection from '../components/products/ProductsSection'

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
    console.log('Database connected successfully')

    // Fetch featured products with category names
    try {
      const products = await sql`
        SELECT 
          p.id, 
          p.name, 
          p.description, 
          p.price, 
          p.stock_qty, 
          p.image_url, 
          p.weight, 
          p.is_active,
          p.created_at,
          c.name as category_name 
        FROM Products p 
        LEFT JOIN Categories c ON p.category_id = c.id 
        WHERE p.is_active = true 
        ORDER BY p.created_at DESC 
        LIMIT 8
      `;
      featuredProducts = products || [];
      console.log(`Fetched ${featuredProducts.length} products`);
    } catch (productError) {
      console.error('Error fetching products:', productError.message);
      featuredProducts = [];
    }

    // Fetch categories
    try {
      const cats = await sql`
        SELECT 
          id, 
          name, 
          description, 
          image_url,
          created_at
        FROM Categories 
        ORDER BY created_at ASC 
        LIMIT 6
      `;
      categories = cats || [];
      console.log(`Fetched ${categories.length} categories`);
    } catch (categoryError) {
      console.error('Error fetching categories:', categoryError.message);
      categories = [];
    }

    // Fetch product count
    try {
      const productCount = await sql`
        SELECT COUNT(*)::int as count 
        FROM Products 
        WHERE is_active = true
      `;
      stats.totalProducts = parseInt(productCount[0]?.count) || 0;
    } catch (e) {
      console.log('Error fetching product count:', e.message);
      stats.totalProducts = 0;
    }

    // Fetch customer count
    try {
      const customerCount = await sql`
        SELECT COUNT(*)::int as count 
        FROM users 
        WHERE role = 'customer'
      `;
      stats.totalCustomers = parseInt(customerCount[0]?.count) || 0;
    } catch (e) {
      console.log('Error fetching customer count:', e.message);
      stats.totalCustomers = 0;
    }

    // Fetch orders count
    try {
      const orderCount = await sql`
        SELECT COUNT(*)::int as count FROM Orders
      `;
      stats.totalOrders = parseInt(orderCount[0]?.count) || 0;
    } catch (e) {
      console.log('Error fetching order count (table might not exist):', e.message);
      stats.totalOrders = 0;
    }
    
    console.log('Data fetched successfully:', {
      productsCount: featuredProducts.length,
      categoriesCount: categories.length,
      stats
    })
    
  } catch (error) {
    console.error('Database error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    })
    
    // Fallback to empty arrays if database fails
    featuredProducts = []
    categories = []
    stats = { totalProducts: 0, totalCustomers: 0, totalOrders: 0 }
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
        subtitle="Discover our handpicked selection of the finest makhana varieties, sourced directly from Bihar&apos;s traditional farmers."
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

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Numbers Speak</h2>
            <p className="text-gray-600">Growing community of makhana lovers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.totalProducts}+
              </div>
              <p className="text-gray-600">Premium Products</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.totalCustomers}+
              </div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.totalOrders}+
              </div>
              <p className="text-gray-600">Orders Delivered</p>
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
