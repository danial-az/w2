import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const PublicFormPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="public-form-container">
      <header className="public-form-header">
        <div className="public-form-header-content">
          <div className="public-form-logo">فرم‌ساز</div>
        </div>
      </header>
      <div className="public-form-content">
        <div className="coming-soon-message">
          <div className="coming-soon-icon">🚧</div>
          <h3>این قابلیت در حال توسعه است</h3>
          <p>امکان پر کردن و ارسال فرم هنوز تکمیل نشده است. لطفاً بعداً مراجعه کنید.</p>
          <button onClick={() => navigate('/')} className="back-button">
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicFormPage;