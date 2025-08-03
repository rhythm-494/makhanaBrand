import sql from '../../lib/db'

export const categoryService = {
  // Get all categories for homepage
  async getAllCategories(limit = 6) {
    try {
      const categories = await sql`
        SELECT 
          c.id, 
          c.name, 
          c.description, 
          c.image_url,
          c.created_at,
          COUNT(p.id)::int as product_count
        FROM Categories c
        LEFT JOIN Products p ON c.id = p.category_id AND p.is_active = true
        GROUP BY c.id, c.name, c.description, c.image_url, c.created_at
        ORDER BY c.created_at ASC 
        LIMIT ${limit}
      `;
      return categories || [];
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      return [];
    }
  },

  // Get category with products
  async getCategoryWithProducts(categoryId) {
    try {
      const category = await sql`
        SELECT 
          id, 
          name, 
          description, 
          image_url
        FROM Categories 
        WHERE id = ${categoryId}
      `;
      
      if (category.length === 0) return null;

      const products = await sql`
        SELECT 
          id, 
          name, 
          description, 
          price, 
          image_url, 
          weight
        FROM Products 
        WHERE category_id = ${categoryId} AND is_active = true 
        ORDER BY created_at DESC
      `;

      return {
        ...category[0],
        products: products || []
      };
    } catch (error) {
      console.error('Error fetching category with products:', error.message);
      return null;
    }
  }
};
