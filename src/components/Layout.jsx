import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Layout = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">Mini CRM</div>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/orders">Orders</Link>
        </nav>
        <div className="user-menu">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      
      <main className="content">
        <Outlet />
      </main>
      
      <footer>
        <p>Mini CRM &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Layout;