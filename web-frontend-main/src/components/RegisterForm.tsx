// components/RegisterForm.tsx
import React, { useState } from 'react';
import { RegisterCredentials } from '../types/auth';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState<string>('');
  const { register, state } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    
    if (name === 'confirmPassword' || name === 'password') {
      if (name === 'password' && credentials.confirmPassword && value !== credentials.confirmPassword) {
        setPasswordError('رمز عبور و تکرار آن مطابقت ندارند');
      } else if (name === 'confirmPassword' && value !== credentials.password) {
        setPasswordError('رمز عبور و تکرار آن مطابقت ندارند');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credentials.password !== credentials.confirmPassword) {
      setPasswordError('رمز عبور و تکرار آن مطابقت ندارند');
      return;
    }
    
    await register(credentials);
  };

  return (
    <div className="auth-form-container">
      <h2>ثبت نام حساب کاربری</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="name">نام و نام خانوادگی</label>
          <input
            type="text"
            id="name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            required
            placeholder="نام و نام خانوادگی خود را وارد کنید"
          />
        </div>
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
            placeholder="رمز عبور را وارد کنید"
            minLength={6}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">تکرار رمز عبور</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleChange}
            required
            placeholder="رمز عبور را مجدداً وارد کنید"
            minLength={6}
          />
        </div>
        {passwordError && <div className="error-message">{passwordError}</div>}
        {state.error && <div className="error-message">{state.error}</div>}
        <button type="submit" className="auth-button" disabled={state.isLoading || Boolean(passwordError)}>
          {state.isLoading ? 'در حال ثبت نام...' : 'ثبت نام'}
        </button>
      </form>
      <div className="auth-links">
        <Link to="/login">ورود به حساب کاربری</Link>
        <span></span>
      </div>
    </div>
  );
};

export default RegisterForm;