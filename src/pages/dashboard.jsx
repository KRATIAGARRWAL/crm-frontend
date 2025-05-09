import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    recentOrders: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [customerResponse, orderResponse, recentResponse] = await Promise.all([
          api.get('/customers/count'),
          api.get('/orders/count'),
          api.get('/orders/recent')
        ]);
        
        setStats({
          totalCustomers: customerResponse.data.count,
          totalOrders: orderResponse.data.count,
          recentOrders: recentResponse.data
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Customers</h3>
          <div className="stat-value">{stats.totalCustomers}</div>
        </div>
        
        <div className="stat-card">
          <h3>Total Orders</h3>
          <div className="stat-value">{stats.totalOrders}</div>
        </div>
      </div>
      
      <div className="recent-orders">
        <h2>Recent Orders</h2>
        {stats.recentOrders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.customerName}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No recent orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
