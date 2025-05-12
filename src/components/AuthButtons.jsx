import { useAuth } from '../context/AuthContext';

export default function AuthButtons() {
  const { user, logout } = useAuth();

  const handleLogin = () => {
    window.location.href = "https://crm-backend-d0ny.onrender.com/auth/google";
    
  };

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <img src={user.picture} alt="user" className="w-8 h-8 rounded-full" />
          <span>{user.name}</span>
          <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
        </>
      ) : (
        <button onClick={handleLogin} className="bg-blue-600 text-white px-3 py-1 rounded">Login with Google</button>
      )}
    </div>
  );
}
