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
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold">Add Customer</h2>
      {['name', 'email', 'phone', 'totalSpend', 'visits', 'lastActive'].map(field => (
        <input
          key={field}
          type={field === 'lastActive' ? 'date' : 'text'}
          name={field}
          placeholder={field}
          value={form[field]}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      ))}
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}
