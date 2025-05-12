import { useState } from 'react';
import { addCustomer } from '../api/api';

export default function CustomerForm({ onCustomerAdded }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', totalSpend: '', visits: '', lastActive: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await addCustomer(form);
    onCustomerAdded();
    setForm({ name: '', email: '', phone: '', totalSpend: '', visits: '', lastActive: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 mt-6 bg-gradient-to-br from-white to-teal-60 shadow rounded border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-800">Add Customer</h2>
      {['name', 'email', 'phone', 'totalSpend', 'visits', 'lastActive'].map(field => (
        <input
          key={field}
          type={field === 'lastActive' ? 'date' : 'text'}
          name={field}
          placeholder={field}
          value={form[field]}
          onChange={handleChange}
          className="w-full border border-teal-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      ))}
      <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded">Add Customer</button>
    </form>
  );
}
