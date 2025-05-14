import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FormResponses: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  
  return (
    <div className="responses-container">
      <div className="responses-header">
        <h2>پاسخ‌های فرم</h2>
        <button onClick={() => navigate('/form-builder')} className="back-button">
          بازگشت به داشبورد
        </button>
      </div>
      
      <div className="coming-soon-message">
        <div className="coming-soon-icon">🚧</div>
        <h3>این قابلیت در حال توسعه است</h3>
        <p>امکان مشاهده پاسخ‌های فرم هنوز تکمیل نشده است. لطفاً بعداً مراجعه کنید.</p>
      </div>
    </div>
  );
};

export default FormResponses; 