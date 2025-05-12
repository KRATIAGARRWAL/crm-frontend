import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gradient-to-br from-white to-teal-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-white to-teal-80 shadow-md p-4 border-r border-teal-100">
        <h1 className="text-2xl font-bold text-teal-700 mb-6">CRM Pro</h1>
        <nav className="space-y-4">
          <Link to="/dataIngestion" className="block text-teal-800 hover:text-teal-600">Data Ingestion</Link>
          <Link to="/segment" className="block text-teal-800 hover:text-teal-600">Segment Builder</Link>
          <Link to="/campaigns" className="block text-teal-800 hover:text-teal-600">Campaigns</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-end items-center mb-4">
          {user ? (
            <div className="flex items-center gap-3">
              <img src={user.picture} alt="profile" className="w-8 h-8 rounded-full" />
              <span className="text-sm font-medium text-teal-900">{user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Login/>
          )}
        </div>

        {children}
      </main>
    </div>
  );
}