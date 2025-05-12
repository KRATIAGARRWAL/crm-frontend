import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();

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
        <div className="flex justify-end items-center mb-4">
          {user ? (
            <div className="flex items-center gap-3">
              <img src={user.picture} alt="profile" className="w-8 h-8 rounded-full" />
              <span className="text-sm font-medium">{user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <a
              href="http://localhost:5000/auth/google"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Login with Google
            </a>
          )}
        </div>

        {children}
      </main>
    </div>
  );
}
