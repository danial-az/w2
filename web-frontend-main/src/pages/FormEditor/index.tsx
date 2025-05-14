import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Form } from '../../types/form';
import { formService } from '../../services/formService';
import { getDefaultLabelForType, getFieldTypeLabel } from '../../utils/fieldUtils';
import EditorHeader from './EditorHeader';
import EditorWorkspace from './EditorWorkspace';

const FormEditor: React.FC<{ isNew: boolean }> = ({ isNew }) => {
  const { formId } = useParams<{ formId: string }>();
  const { state } = useAuth();
  const navigate = useNavigate();
  
  const [form, setForm] = useState<Form>({
    id: '',
    title: '',
    description: '',
    fields: [],
    createdAt: '',
    updatedAt: '',
    published: false,
    userId: state.user?.id || '',
    responsesCount: 0
  });
  
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState<string | null>(null);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [showFieldTypes, setShowFieldTypes] = useState(false);
  
  useEffect(() => {
    if (!isNew && formId) {
      const fetchForm = async () => {
        try {
          const existingForm = await formService.getFormById(formId);
          if (existingForm) {
            setForm(existingForm);
          } else {
            setError('فرم مورد نظر یافت نشد.');
          }
        } catch (err) {
          setError('خطا در بارگیری فرم.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchForm();
    } else {
      const newForm: Form = {
        id: Math.random().toString(36).substr(2, 9),
        title: 'فرم بدون عنوان',
        description: '',
        fields: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        published: false,
        userId: state.user?.id || '',
        responsesCount: 0
      };
      
      setForm(newForm);
    }
  }, [formId, isNew, state.user?.id]);
  
  if (loading) {
    return <div className="loading-container">در حال بارگذاری...</div>;
  }
  
  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => navigate('/form-builder')} className="back-button">
          بازگشت به داشبورد
        </button>
      </div>
    );
  }
  
  return (
    <div className="form-editor-container">
      <EditorHeader 
        form={form}
        setForm={setForm}
        isNew={isNew}
        onSave={() => {
          const handleSaveForm = async () => {
            try {
              if (isNew) {
                await formService.createForm(state.user?.id || '', form);
              } else {
                await formService.updateForm(form.id, form);
              }
              
              navigate('/form-builder');
            } catch (err) {
              setError('خطا در ذخیره فرم. لطفاً دوباره تلاش کنید.');
              console.error(err);
            }
          };
          
          handleSaveForm();
        }}
        onTogglePublish={async () => {
          try {
            const updatedForm = await formService.togglePublishForm(form.id);
            setForm(updatedForm);
          } catch (err) {
            setError('خطا در تغییر وضعیت انتشار فرم.');
            console.error(err);
          }
        }}
        onCancel={() => navigate('/form-builder')}
      />
      
      <EditorWorkspace
        form={form}
        setForm={setForm}
        selectedFieldId={selectedFieldId}
        setSelectedFieldId={setSelectedFieldId}
        showFieldTypes={showFieldTypes}
        setShowFieldTypes={setShowFieldTypes}
        getFieldTypeLabel={getFieldTypeLabel}
        getDefaultLabelForType={getDefaultLabelForType}
      />
    </div>
  );
};

export default FormEditor; 