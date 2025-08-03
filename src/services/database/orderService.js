import sql from '../../lib/db'

export const orderService = {
  // Get order count
  async getOrderCount() {
    try {
      const result = await sql`
        SELECT COUNT(*)::int as count FROM Orders
      `;
      return parseInt(result[0]?.count) || 0;
    } catch (error) {
      console.error('Error fetching order count:', error.message);
      return 0;
    }
  },

  // Get recent orders for activity feed
  async getRecentOrders(limit = 5) {
    try {
      const orders = await sql`
        SELECT 
          o.id,
          o.total_amount,
          o.status,
          o.created_at,
          u.name as customer_name
        FROM Orders o
        LEFT JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
        LIMIT ${limit}
      `;
      return orders || [];
    } catch (error) {
      console.error('Error fetching recent orders:', error.message);
      return [];
    }
  },

  // Get total revenue
  async getTotalRevenue() {
    try {
      const result = await sql`
        SELECT COALESCE(SUM(total_amount), 0)::numeric as revenue
        FROM Orders 
        WHERE status IN ('completed', 'delivered')
      `;
      return parseFloat(result[0]?.revenue) || 0;
    } catch (error) {
      console.error('Error fetching total revenue:', error.message);
      return 0;
    }
  }
};
