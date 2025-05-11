export default function CustomerList({ customers }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Customers</h3>
      <ul className="space-y-2">
        {customers.map(c => (
          <li key={c._id} className="p-3 bg-gray-100 rounded shadow-sm">
            <p><strong>{c.name}</strong> - {c.email} - ₹{c.totalSpend}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
