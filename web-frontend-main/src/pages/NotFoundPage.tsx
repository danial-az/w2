import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-code">404</div>
      <h1 className="not-found-title">صفحه مورد نظر یافت نشد</h1>
      <p className="not-found-description">صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.</p>
      <Link to="/" className="not-found-home-button">بازگشت به صفحه اصلی</Link>
    </div>
  );
};

export default NotFoundPage;