import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context';

const HomePage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/form-builder');
    }
  }, [state.isAuthenticated, navigate]);

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="home-header-content">
          <div className="home-logo">فرم‌ساز</div>
          <nav className="home-nav">
            <Link to="/" className="home-nav-link">صفحه اصلی</Link>
            <Link to="#features" className="home-nav-link">ویژگی‌ها</Link>
            <Link to="#contact" className="home-nav-link">تماس با ما</Link>
          </nav>
          <div className="home-auth-buttons">
            <Link to="/login" className="home-login-button">ورود</Link>
            <Link to="/register" className="home-register-button">ثبت نام</Link>
          </div>
        </div>
      </header>
      
      <section className="home-hero">
        <div className="home-hero-content">
          <h1 className="home-hero-title">ساخت فرم‌های آنلاین به سادگی</h1>
          <p className="home-hero-subtitle">
            با استفاده از فرم‌ساز، به راحتی فرم‌های آنلاین بسازید، اطلاعات جمع‌آوری کنید و نتایج را تحلیل کنید.
          </p>
          <Link to="/register" className="home-hero-button">شروع رایگان</Link>
        </div>
      </section>
      
      <section className="home-features">
        <div className="home-features-content">
          <h2 className="home-features-title">ویژگی‌های فرم‌ساز</h2>
          <div className="home-features-grid">
            <div className="home-feature-card">
              <div className="home-feature-icon">📝</div>
              <h3 className="home-feature-title">طراحی آسان</h3>
              <p className="home-feature-description">با رابط کاربری ساده و کشیدن و رها کردن، فرم‌های خود را به سرعت طراحی کنید.</p>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-icon">📊</div>
              <h3 className="home-feature-title">تحلیل پاسخ‌ها</h3>
              <p className="home-feature-description">پاسخ‌های دریافتی را با نمودارها و گزارش‌های تحلیلی بررسی کنید.</p>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-icon">🔒</div>
              <h3 className="home-feature-title">امنیت بالا</h3>
              <p className="home-feature-description">داده‌های شما با بالاترین استانداردهای امنیتی محافظت می‌شوند.</p>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-icon">📱</div>
              <h3 className="home-feature-title">واکنش‌گرا</h3>
              <p className="home-feature-description">فرم‌ها در تمام دستگاه‌ها از جمله موبایل، تبلت و کامپیوتر به خوبی نمایش داده می‌شوند.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="home-cta">
        <div className="home-cta-content">
          <h2 className="home-cta-title">همین امروز شروع کنید</h2>
          <p className="home-cta-description">به هزاران کاربری بپیوندید که از فرم‌ساز برای جمع‌آوری اطلاعات استفاده می‌کنند.</p>
          <Link to="/register" className="home-cta-button">ثبت‌نام رایگان</Link>
        </div>
      </section>
      
      <footer className="home-footer">
        <div className="home-footer-content">
          <div className="home-footer-logo">فرم‌ساز</div>
          <nav className="home-footer-nav">
            <Link to="/about" className="home-footer-link">درباره ما</Link>
            <Link to="/privacy" className="home-footer-link">حریم خصوصی</Link>
            <Link to="/terms" className="home-footer-link">قوانین</Link>
            <Link to="/contact" className="home-footer-link">تماس با ما</Link>
          </nav>
          <p className="home-footer-copyright">© {new Date().getFullYear()} فرم‌ساز - تمامی حقوق محفوظ است.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;