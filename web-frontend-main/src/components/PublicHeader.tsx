// components/PublicHeader.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PublicHeaderProps {
  hideAuthButtons?: boolean;
}

const PublicHeader: React.FC<PublicHeaderProps> = ({ hideAuthButtons = false }) => {
  const { state, logout } = useAuth();
  const isAuthenticated = Boolean(state.user);

  return (
    <header className="public-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">فرم‌ساز</Link>
          </div>
          {!hideAuthButtons && (
            <div className="nav-links">
              {isAuthenticated ? (
                <>
                  <Link to="/form-builder" className="nav-link">داشبورد فرم‌ها</Link>
                  <button onClick={logout} className="nav-button">خروج</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">ورود</Link>
                  <Link to="/register" className="nav-button">ثبت نام</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;