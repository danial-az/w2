import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FormStats: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  
  return (
    <div className="stats-container">
      <div className="stats-header">
        <h2>آمار فرم</h2>
        <button onClick={() => navigate('/form-builder')} className="back-button">
          بازگشت به داشبورد
        </button>
      </div>
      
      <div className="coming-soon-message">
        <div className="coming-soon-icon">🚧</div>
        <h3>این قابلیت در حال توسعه است</h3>
        <p>امکان مشاهده آمار فرم هنوز تکمیل نشده است. لطفاً بعداً مراجعه کنید.</p>
      </div>
    </div>
  );
};

export default FormStats; 