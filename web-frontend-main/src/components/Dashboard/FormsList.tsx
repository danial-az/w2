import React, { useEffect, useState } from 'react';
import { Form } from '../../types/form';
import FormCard from './FormCard';
import { formService } from '../../services/formService';
import { useAuth } from '../../context/AuthContext';

const FormsList: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { state } = useAuth();
  
  const fetchForms = async () => {
    if (!state.user) return;
    
    try {
      setLoading(true);
      const userForms = await formService.getUserForms(state.user.id);
      setForms(userForms);
      setError(null);
    } catch (err) {
      setError('خطا در بارگیری فرم‌ها. لطفاً دوباره تلاش کنید.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchForms();
  }, [state.user]);
  
  const handleDelete = async (formId: string) => {
    if (!window.confirm('آیا از حذف این فرم اطمینان دارید؟')) {
      return;
    }
    
    try {
      await formService.deleteForm(formId);
      setForms(forms.filter(form => form.id !== formId));
    } catch (err) {
      setError('خطا در حذف فرم. لطفاً دوباره تلاش کنید.');
      console.error(err);
    }
  };
  
  const handleTogglePublish = async (formId: string) => {
    try {
      const updatedForm = await formService.togglePublishForm(formId);
      setForms(forms.map(form => form.id === formId ? updatedForm : form));
    } catch (err) {
      setError('خطا در تغییر وضعیت انتشار. لطفاً دوباره تلاش کنید.');
      console.error(err);
    }
  };
  
  if (loading) {
    return <div className="loading-container">در حال بارگذاری فرم‌ها...</div>;
  }
  
  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={fetchForms} className="retry-button">تلاش مجدد</button>
      </div>
    );
  }
  
  if (forms.length === 0) {
    return (
      <div className="empty-forms">
        <div className="empty-state">
          <h3>هنوز فرمی ایجاد نکرده‌اید</h3>
          <p>با کلیک بر روی دکمه «ایجاد فرم جدید» شروع کنید.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="forms-list-container">
      <div className="forms-grid">
        {forms.map(form => (
          <FormCard
            key={form.id}
            form={form}
            onDelete={handleDelete}
            onTogglePublish={handleTogglePublish}
          />
        ))}
      </div>
    </div>
  );
};

export default FormsList;