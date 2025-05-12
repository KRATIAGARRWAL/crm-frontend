export default function CustomerList({ customers }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-teal-800">Customers</h3>
      <ul className="space-y-2">
        {customers.map(c => (
          <li key={c._id} className="p-3 bg-white border border-teal-100 rounded shadow-sm">
            <p><strong className="text-teal-700">{c.name}</strong> - {c.email} - ₹{c.totalSpend}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}