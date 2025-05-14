import React from 'react';
import { useNavigate } from 'react-router-dom';

const PublicFormStatsPage: React.FC = () => {
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
          <p>امکان مشاهده آمار فرم هنوز تکمیل نشده است. لطفاً بعداً مراجعه کنید.</p>
          <button onClick={() => navigate('/')} className="back-button">
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicFormStatsPage;