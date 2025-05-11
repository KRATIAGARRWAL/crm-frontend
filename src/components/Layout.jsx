import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Mini CRM</h1>
        <nav className="space-y-4">
          <Link to="/dataIngestion" className="block text-gray-700 hover:text-blue-600">Data Ingestion</Link>
          <Link to="/segment" className="block text-gray-700 hover:text-blue-600">Segment Builder</Link>
          <Link to="/campaigns" className="block text-gray-700 hover:text-blue-600">Campaigns</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
