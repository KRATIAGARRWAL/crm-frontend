import Layout from '../components/Layout.jsx';
import CustomerForm from '../components/CustomerForm';
import OrderForm from '../components/OrderForm';
import CustomerList from '../components/CustomerList';
import OrderList from '../components/OrderList';
import { fetchCustomers, fetchOrders } from '../api/api';
import { useEffect, useState } from 'react';

export default function DataIngestion() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  const reloadData = () => {
    fetchCustomers().then(setCustomers);
    fetchOrders().then(setOrders);
  };

  useEffect(() => {
    reloadData();
  }, []);

  return (
    <Layout>
      <div className="grid md:grid-cols-2 gap-6">
        <CustomerForm onCustomerAdded={reloadData} />
        <OrderForm onOrderAdded={reloadData} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <CustomerList customers={customers} />
        <OrderList orders={orders} />
      </div>
    </Layout>
  );
}
