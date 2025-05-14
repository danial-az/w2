import React from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProtectedRoute } from '../hooks/useProtectedRoute';
import Dashboard from './Dashboard';
import FormEditor from './FormEditor';
import FormResponses from './FormResponses';
import FormStats from './FormStats';

const FormBuilderLayout: React.FC = () => {
  const isAuthenticated = useProtectedRoute();
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return <div className="loading-container">در حال بررسی وضعیت احراز هویت...</div>;
  }

  return (
    <div className="form-builder-page">
      <header className="app-header">
        <div className="header-content">
          <h1>
            <Link to="/form-builder" className="header-logo">فرم ساز</Link>
          </h1>
          <div className="user-info">
            <span>خوش آمدید، {state.user?.name || state.user?.email}</span>
            <button onClick={handleLogout} className="logout-button">خروج</button>
          </div>
        </div>
      </header>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<FormEditor isNew={true} />} />
          <Route path="/edit/:formId" element={<FormEditor isNew={false} />} />
          <Route path="/responses/:formId" element={<FormResponses />} />
          <Route path="/stats/:formId" element={<FormStats />} />
        </Routes>
      </div>
    </div>
  );
};

export default FormBuilderLayout; 