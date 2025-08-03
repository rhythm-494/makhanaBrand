import sql from '../../lib/db'

export const productService = {
  // Get featured products for homepage
  async getFeaturedProducts(limit = 8) {
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
          c.name as category_name,
          c.id as category_id
        FROM Products p 
        LEFT JOIN Categories c ON p.category_id = c.id 
        WHERE p.is_active = true 
        ORDER BY p.created_at DESC 
        LIMIT ${limit}
      `;
      return products || [];
    } catch (error) {
      console.error('Error fetching featured products:', error.message);
      return [];
    }
  },

  // Get trending products based on stock levels
  async getTrendingProducts(limit = 6) {
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
          c.name as category_name
        FROM Products p 
        LEFT JOIN Categories c ON p.category_id = c.id 
        WHERE p.is_active = true AND p.stock_qty > 0
        ORDER BY p.stock_qty ASC, p.created_at DESC
        LIMIT ${limit}
      `;
      return products || [];
    } catch (error) {
      console.error('Error fetching trending products:', error.message);
      return [];
    }
  },

  // Get products by category
  async getProductsByCategory(categoryId, limit = 4) {
    try {
      const products = await sql`
        SELECT 
          p.id, 
          p.name, 
          p.description, 
          p.price, 
          p.image_url, 
          p.weight
        FROM Products p 
        WHERE p.category_id = ${categoryId} AND p.is_active = true 
        ORDER BY p.created_at DESC 
        LIMIT ${limit}
      `;
      return products || [];
    } catch (error) {
      console.error('Error fetching products by category:', error.message);
      return [];
    }
  },

  // Get product count
  async getProductCount() {
    try {
      const result = await sql`
        SELECT COUNT(*)::int as count 
        FROM Products 
        WHERE is_active = true
      `;
      return parseInt(result[0]?.count) || 0;
    } catch (error) {
      console.error('Error fetching product count:', error.message);
      return 0;
    }
  }
};
