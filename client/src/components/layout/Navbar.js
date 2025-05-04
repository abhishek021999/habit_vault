import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-check-double me-2"></i>
          HabitVault
        </Link>
        
        <ul className="navbar-nav ms-auto d-flex flex-row">
          {token ? (
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="nav-link btn btn-link text-white"
              >
                <i className="fas fa-sign-out-alt me-1"></i>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">
                  <i className="fas fa-sign-in-alt me-1"></i>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/register">
                  <i className="fas fa-user-plus me-1"></i>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 