export default function ProductsSection({ products, categories, title, subtitle }) {
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No products available at the moment.</p>
            </div>
          ) : (
            products.map(product => (
              <div key={product.id} className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
