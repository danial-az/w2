// components/LoginForm.tsx
import React, { useState } from 'react';
import { LoginCredentials } from '../types/auth';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const { login, state } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <div className="auth-form-container">
      <h2>ورود به حساب کاربری</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">ایمیل</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            placeholder="example@email.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">رمز عبور</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            placeholder="رمز عبور خود را وارد کنید"
          />
        </div>
        {state.error && <div className="error-message">{state.error}</div>}
        <button type="submit" className="auth-button" disabled={state.isLoading}>
          {state.isLoading ? 'در حال ورود...' : 'ورود'}
        </button>
      </form>
      <div className="auth-links">
        <Link to="/register">ثبت نام حساب جدید</Link>
        <a href="#forgot-password">فراموشی رمز عبور</a>
      </div>
    </div>
  );
};

export default LoginForm;