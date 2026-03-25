import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FiLogOut, FiMoon, FiSun } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className="navbar container">
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)', textDecoration: 'none' }}>
        TaskFlow
      </Link>
      <div className="nav-links">
        <button onClick={toggleTheme} className="btn-outline" style={{ padding: '0.4rem', borderRadius: '50%', display: 'flex' }}>
          {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>
        {user ? (
          <>
            <span style={{ fontWeight: 500, marginRight: '1rem', color: 'var(--text-secondary)' }}>Welcome, {user.name}</span>
            <button onClick={onLogout} className="btn btn-outline">
              <FiLogOut /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
