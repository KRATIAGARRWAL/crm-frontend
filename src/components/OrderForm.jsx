import { useState, useEffect } from 'react';
import { addOrder, fetchCustomers } from '../api/api';

export default function OrderForm({ onOrderAdded }) {
  const [form, setForm] = useState({ customerId: '', amount: '' });
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers().then(setCustomers);
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await addOrder(form);
    onOrderAdded();
    setForm({ customerId: '', amount: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gradient-to-br from-white to-teal-60 shadow rounded border border-teal-200  mt-6 ">
      <h2 className="text-xl font-semibold text-teal-800">Add Order</h2>
      <select
        name="customerId"
        value={form.customerId}
        onChange={handleChange}
        className="w-full border border-teal-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      >
        <option value="">Select Customer</option>
        {customers.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <input
        type="number"
        name="amount"
        placeholder="Order Amount"
        value={form.amount}
        onChange={handleChange}
        className="w-full border border-teal-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      />
      <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded">Add Order</button>
    </form>
  );
}
