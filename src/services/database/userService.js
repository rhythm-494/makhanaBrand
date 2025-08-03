import sql from '../../lib/db'

export const userService = {
  // Get customer count
  async getCustomerCount() {
    try {
      const result = await sql`
        SELECT COUNT(*)::int as count 
        FROM users 
        WHERE role = 'customer'
      `;
      return parseInt(result[0]?.count) || 0;
    } catch (error) {
      console.error('Error fetching customer count:', error.message);
      return 0;
    }
  },

  // Get recent customers for testimonials
  async getRecentCustomers(limit = 5) {
    try {
      const customers = await sql`
        SELECT 
          u.id,
          u.name,
          u.created_at
        FROM users u
        WHERE u.role = 'customer'
        ORDER BY u.created_at DESC
        LIMIT ${limit}
      `;
      return customers || [];
    } catch (error) {
      console.error('Error fetching recent customers:', error.message);
      return [];
    }
  }
};
