import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context';

interface HeaderProps {
  hideAuthButtons?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hideAuthButtons = false }) => {
  const { state, logout } = useAuth();
  const isAuthenticated = Boolean(state.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="public-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">فرم‌ساز</Link>
          </div>
          
          <button className="mobile-menu-button" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
          
          {!hideAuthButtons && (
            <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
              {isAuthenticated ? (
                <>
                  <Link to="/form-builder" className="nav-link" onClick={() => setMobileMenuOpen(false)}>داشبورد فرم‌ها</Link>
                  <button onClick={logout} className="nav-button">خروج</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link" onClick={() => setMobileMenuOpen(false)}>ورود</Link>
                  <Link to="/register" className="nav-button" onClick={() => setMobileMenuOpen(false)}>ثبت نام</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 