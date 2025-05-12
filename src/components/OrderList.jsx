export default function OrderList({ orders }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-teal-800">Orders</h3>
      <ul className="space-y-2">
        {orders.map(o => (
          <li key={o._id} className="p-3 bg-white border border-teal-100 rounded shadow-sm">
            <p><strong className="text-teal-700">{o.customerId?.name || 'Unknown'} </strong>ordered ₹{o.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
