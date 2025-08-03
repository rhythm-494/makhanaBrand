import { productService } from './productService'
import { userService } from './userService'
import { orderService } from './orderService'

export const statsService = {
  // Get all homepage stats
  async getHomepageStats() {
    try {
      const [
        totalProducts,
        totalCustomers,
        totalOrders,
        totalRevenue
      ] = await Promise.all([
        productService.getProductCount(),
        userService.getCustomerCount(),
        orderService.getOrderCount(),
        orderService.getTotalRevenue()
      ]);

      return {
        totalProducts,
        totalCustomers,
        totalOrders,
        totalRevenue
      };
    } catch (error) {
      console.error('Error fetching homepage stats:', error.message);
      return {
        totalProducts: 0,
        totalCustomers: 0,
        totalOrders: 0,
        totalRevenue: 0
      };
    }
  },

  // Get dashboard stats with growth metrics
  async getDashboardStats() {
    try {
      const stats = await this.getHomepageStats();
      
      // Get monthly growth
      const monthlyGrowth = await sql`
        SELECT 
          COUNT(*)::int as new_customers_this_month
        FROM users 
        WHERE role = 'customer' 
        AND created_at >= DATE_TRUNC('month', CURRENT_DATE)
      `;

      const monthlyOrders = await sql`
        SELECT 
          COUNT(*)::int as orders_this_month,
          COALESCE(SUM(total_amount), 0)::numeric as revenue_this_month
        FROM Orders 
        WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)
      `;

      return {
        ...stats,
        newCustomersThisMonth: monthlyGrowth[0]?.new_customers_this_month || 0,
        ordersThisMonth: monthlyOrders[0]?.orders_this_month || 0,
        revenueThisMonth: parseFloat(monthlyOrders[0]?.revenue_this_month) || 0
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error.message);
      return await this.getHomepageStats();
    }
  }
};
