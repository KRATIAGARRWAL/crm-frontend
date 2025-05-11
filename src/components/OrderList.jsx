export default function OrderList({ orders }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Orders</h3>
      <ul className="space-y-2">
        {orders.map(o => (
          <li key={o._id} className="p-3 bg-gray-100 rounded shadow-sm">
            <p>{o.customerId?.name || 'Unknown'} ordered ₹{o.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
