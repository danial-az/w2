// components/Dashboard/FormCard.tsx
import React from 'react';
import { Form } from '../../types/form';
import { useNavigate } from 'react-router-dom';
import { formService } from '../../services/formService';

interface FormCardProps {
  form: Form;
  onDelete: (formId: string) => void;
  onTogglePublish: (formId: string) => void;
}

const FormCard: React.FC<FormCardProps> = ({ form, onDelete, onTogglePublish }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const handleEdit = () => {
    navigate(`/form-builder/edit/${form.id}`);
  };
  
  const handleViewResponses = () => {
    navigate(`/form-builder/responses/${form.id}`);
  };
  
  const handleViewStats = () => {
    navigate(`/form-builder/stats/${form.id}`);
  };
  
  const handleViewForm = () => {
    const publicUrl = formService.getFormPublicUrl(form.id);
    window.open(publicUrl, '_blank');
  };
  
  const handleViewPublicStats = () => {
    const statsUrl = formService.getFormStatsUrl(form.id);
    window.open(statsUrl, '_blank');
  };
  
  const handleCopyLink = () => {
    const publicUrl = `${window.location.origin}${formService.getFormPublicUrl(form.id)}`;
    navigator.clipboard.writeText(publicUrl)
      .then(() => {
        alert('لینک فرم در کلیپ‌بورد کپی شد.');
      })
      .catch(err => {
        console.error('خطا در کپی لینک:', err);
        alert('لینک فرم: ' + publicUrl);
      });
  };
  
  return (
    <div className="form-card">
      <div className="form-card-header">
        <h3>{form.title}</h3>
        <div className="form-card-badge" data-status={form.published ? 'published' : 'draft'}>
          {form.published ? 'منتشر شده' : 'پیش‌نویس'}
        </div>
      </div>
      
      <div className="form-card-body">
        {form.description && <p className="form-description">{form.description}</p>}
        <div className="form-meta">
          <div className="form-meta-item">
            <span className="meta-label">تعداد فیلدها:</span>
            <span className="meta-value">{form.fields.length}</span>
          </div>
          <div className="form-meta-item">
            <span className="meta-label">تعداد پاسخ‌ها:</span>
            <span className="meta-value">{form.responsesCount}</span>
          </div>
          <div className="form-meta-item">
            <span className="meta-label">آخرین بروزرسانی:</span>
            <span className="meta-value">{formatDate(form.updatedAt)}</span>
          </div>
        </div>
      </div>
      
      <div className="form-card-actions">
        <button className="action-button edit" onClick={handleEdit}>
          ویرایش
        </button>
        <button 
          className={`action-button ${form.published ? 'unpublish' : 'publish'}`}
          onClick={() => onTogglePublish(form.id)}
        >
          {form.published ? 'لغو انتشار' : 'انتشار'}
        </button>
        {form.published && (
          <>
            <button className="action-button view-form" onClick={handleViewForm}>
              مشاهده فرم
            </button>
            <button className="action-button copy-link" onClick={handleCopyLink}>
              کپی لینک
            </button>
          </>
        )}
        <button 
          className="action-button responses"
          onClick={handleViewResponses}
          disabled={form.responsesCount === 0}
        >
          پاسخ‌ها
        </button>
        <button 
          className="action-button stats"
          onClick={handleViewStats}
          disabled={form.responsesCount === 0}
        >
          آمار
        </button>
        {form.published && form.responsesCount > 0 && (
          <button 
            className="action-button public-stats"
            onClick={handleViewPublicStats}
          >
            آمار عمومی
          </button>
        )}
        <button className="action-button delete" onClick={() => onDelete(form.id)}>
          حذف
        </button>
      </div>
    </div>
  );
};

export default FormCard;