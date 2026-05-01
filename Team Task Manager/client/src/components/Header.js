import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="flex-between">
          <Link to="/" className="logo">
            <h1>📋 Task Manager</h1>
          </Link>
          
          {user && (
            <nav className="nav">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/teams">Teams</Link>
              
              <div className="user-menu">
                <span>{user.name}</span>
                <button onClick={handleLogout} className="btn-secondary">
                  Logout
                </button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
