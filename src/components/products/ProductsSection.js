'use client'
import Image from 'next/image'
import { useState, useMemo } from 'react'

export default function ProductsSection({ products, categories, title, subtitle, showViewAll = false }) {
  const [activeCategory, setActiveCategory] = useState('all')

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return []
    
    if (activeCategory === 'all') {
      return products
    }
    
    return products.filter(product => 
      product.category_id === parseInt(activeCategory) || 
      product.category_name === activeCategory
    )
  }, [products, activeCategory])

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {title || "Our Products"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle || "Discover our premium makhana collection"}
          </p>
        </div>
        
        {/* Functional Categories Filter */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button 
              onClick={() => handleCategoryClick('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'all' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100'
              }`}
            >
              All ({products?.length || 0})
            </button>
            {categories.map(category => {
              const categoryProductCount = products?.filter(p => 
                p.category_id === category.id || p.category_name === category.name
              ).length || 0
              
              return (
                <button 
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id.toString())}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id.toString()
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                  }`}
                >
                  {category.name} ({categoryProductCount})
                </button>
              )
            })}
          </div>
        )}

        {/* Display filtered products count */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products?.length || 0} products
            {activeCategory !== 'all' && (
              <span className="ml-2">
                in <span className="font-semibold text-green-600">
                  {categories.find(c => c.id.toString() === activeCategory)?.name || activeCategory}
                </span>
              </span>
            )}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!filteredProducts || filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              {activeCategory === 'all' ? (
                <>
                  <p className="text-gray-500 text-lg">No products available at the moment.</p>
                  <p className="text-gray-400 text-sm mt-2">Check back soon for new arrivals!</p>
                </>
              ) : (
                <>
                  <p className="text-gray-500 text-lg">
                    No products found in &quot;{categories.find(c => c.id.toString() === activeCategory)?.name}&quot; category.
                  </p>
                  <button 
                    onClick={() => handleCategoryClick('all')}
                    className="text-green-600 hover:text-green-700 text-sm mt-2 underline"
                  >
                    View all products
                  </button>
                </>
              )}
            </div>
          ) : (
            filteredProducts.map(product => (
              <div key={product.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                {/* Product Image */}
                <div className="relative h-48 bg-gray-200">
                  <Image 
                    src={product.image_url || '/images/placeholder-makhana.jpg'} 
                    alt={product.name || 'Makhana Product'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {product.stock_qty <= 5 && product.stock_qty > 0 && (
                    <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      Only {product.stock_qty} left!
                    </span>
                  )}
                  {product.stock_qty === 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Category Badge */}
                  {product.category_name && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2">
                      {product.category_name}
                    </span>
                  )}
                  
                  <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
                    {product.name || 'Unnamed Product'}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description || 'No description available'}
                  </p>
                  
                  {/* Weight/Size */}
                  {product.weight && (
                    <div className="text-sm text-gray-500 mb-3">
                      Weight: {product.weight}g
                    </div>
                  )}
                  
                  {/* Price and Actions */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      ₹{product.price || 'N/A'}
                    </span>
                    {product.stock_qty > 0 ? (
                      <span className="text-sm text-green-600">In Stock</span>
                    ) : (
                      <span className="text-sm text-red-600">Out of Stock</span>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button 
                      className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
                        product.stock_qty > 0 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={product.stock_qty === 0}
                    >
                      {product.stock_qty > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* View All Button */}
        {showViewAll && filteredProducts && filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <a 
              href="/products"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              View All Products
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
