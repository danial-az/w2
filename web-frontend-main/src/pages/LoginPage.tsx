import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context';

const LoginPage: React.FC = () => {
  const { state, login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/form-builder');
    }
  }, [state.isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(credentials);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">فرم‌ساز</div>
        <h2 className="auth-title">ورود به حساب کاربری</h2>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-group">
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
          
          <div className="auth-form-group">
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
          
          <button 
            type="submit" 
            className="auth-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>
        
        <p className="auth-footer">
          حساب کاربری ندارید؟ <Link to="/register" className="auth-link">ثبت نام</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;