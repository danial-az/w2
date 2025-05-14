import React from 'react';
import { Form, FormField } from '../../types/form';

interface FormPreviewProps {
  form: Form;
  onSelectField: (fieldId: string) => void;
  selectedFieldId: string | null;
}

const FormPreview: React.FC<FormPreviewProps> = ({ form, onSelectField, selectedFieldId }) => {
  const renderField = (field: FormField) => {
    const fieldClassName = `preview-field ${selectedFieldId === field.id ? 'selected' : ''}`;
    
    switch (field.type) {
      case 'text':
        return (
          <div className={fieldClassName} onClick={() => onSelectField(field.id)}>
            <label>{field.label} {field.required && <span className="required-mark">*</span>}</label>
            {field.description && <p className="field-description">{field.description}</p>}
            <input
              type="text"
              placeholder={field.placeholder}
              disabled
            />
          </div>
        );
        
      case 'textarea':
        return (
          <div className={fieldClassName} onClick={() => onSelectField(field.id)}>
            <label>{field.label} {field.required && <span className="required-mark">*</span>}</label>
            {field.description && <p className="field-description">{field.description}</p>}
            <textarea
              placeholder={field.placeholder}
              disabled
            />
          </div>
        );
        
      case 'email':
        return (
          <div className={fieldClassName} onClick={() => onSelectField(field.id)}>
            <label>{field.label} {field.required && <span className="required-mark">*</span>}</label>
            {field.description && <p className="field-description">{field.description}</p>}
            <input
              type="email"
              placeholder={field.placeholder}
              disabled
            />
          </div>
        );
        
      case 'radio':
        return (
          <div className={fieldClassName} onClick={() => onSelectField(field.id)}>
            <label>{field.label} {field.required && <span className="required-mark">*</span>}</label>
            {field.description && <p className="field-description">{field.description}</p>}
            <div className="radio-options">
              {field.options?.map(option => (
                <div key={option.id} className="radio-option">
                  <input
                    type="radio"
                    id={`preview-${field.id}-${option.id}`}
                    name={`preview-${field.id}`}
                    disabled
                  />
                  <label htmlFor={`preview-${field.id}-${option.id}`}>{option.label}</label>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'checkbox':
        return (
          <div className={fieldClassName} onClick={() => onSelectField(field.id)}>
            <label>{field.label} {field.required && <span className="required-mark">*</span>}</label>
            {field.description && <p className="field-description">{field.description}</p>}
            <div className="checkbox-options">
              {field.options?.map(option => (
                <div key={option.id} className="checkbox-option">
                  <input
                    type="checkbox"
                    id={`preview-${field.id}-${option.id}`}
                    disabled
                  />
                  <label htmlFor={`preview-${field.id}-${option.id}`}>{option.label}</label>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'select':
        return (
          <div className={fieldClassName} onClick={() => onSelectField(field.id)}>
            <label>{field.label} {field.required && <span className="required-mark">*</span>}</label>
            {field.description && <p className="field-description">{field.description}</p>}
            <select disabled>
              <option value="" disabled selected>
                {field.placeholder || 'انتخاب کنید'}
              </option>
              {field.options?.map(option => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
        
      default:
        return (
          <div className={fieldClassName} onClick={() => onSelectField(field.id)}>
            <p>فیلد نامشخص</p>
          </div>
        );
    }
  };
  
  return (
    <div className="form-preview">
      <div className="preview-header">
        <h2>{form.title || 'فرم بدون عنوان'}</h2>
        {form.description && <p className="form-description">{form.description}</p>}
      </div>
      
      <div className="preview-fields">
        {form.fields.length === 0 ? (
          <div className="empty-preview">
            <p>هنوز فیلدی به فرم اضافه نشده است.</p>
            <p>از منوی سمت راست، نوع فیلد مورد نظر خود را انتخاب کنید.</p>
          </div>
        ) : (
          form.fields.map(field => (
            <div key={field.id} className="preview-field-container">
              {renderField(field)}
            </div>
          ))
        )}
      </div>
      
      <div className="preview-submit">
        <button className="preview-submit-button" disabled>ارسال پاسخ</button>
      </div>
    </div>
  );
};

export default FormPreview;