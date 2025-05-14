// pages/RegisterPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context';

const RegisterPage: React.FC = () => {
  const { state, register } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/form-builder');
    }
  }, [state.isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
    
    // Clear password error when user types in password fields
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (userData.password !== userData.confirmPassword) {
      setPasswordError('رمز عبور و تکرار آن باید یکسان باشند');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await register(userData);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">فرم‌ساز</div>
        <h2 className="auth-title">ثبت نام حساب کاربری</h2>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="name">نام کامل</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
              placeholder="نام و نام خانوادگی"
            />
          </div>
          
          <div className="auth-form-group">
            <label htmlFor="email">ایمیل</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
              placeholder="example@email.com"
            />
          </div>
          
          <div className="auth-form-group">
            <label htmlFor="password">رمز عبور</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
              placeholder="حداقل 8 کاراکتر"
              minLength={8}
            />
          </div>
          
          <div className="auth-form-group">
            <label htmlFor="confirmPassword">تکرار رمز عبور</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="تکرار رمز عبور"
              minLength={8}
            />
          </div>
          
          {passwordError && <div className="error-message">{passwordError}</div>}
          {state.error && <div className="error-message">{state.error}</div>}
          
          <button 
            type="submit" 
            className="auth-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'در حال ثبت نام...' : 'ثبت نام'}
          </button>
        </form>
        
        <p className="auth-footer">
          قبلاً ثبت نام کرده‌اید؟ <Link to="/login" className="auth-link">ورود</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;