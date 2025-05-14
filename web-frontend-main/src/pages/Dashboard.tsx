import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormsList from '../components/Dashboard/FormsList';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCreateForm = () => {
    navigate('/form-builder/create');
  };
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>فرم‌های من</h2>
        <button onClick={handleCreateForm} className="create-form-button">
          ایجاد فرم جدید
        </button>
      </div>
      
      <div className="dashboard-content">
        <FormsList />
      </div>
    </div>
  );
};

export default Dashboard; 