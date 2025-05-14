import React, { useState, useEffect } from 'react';
import { FormField, FieldOption, FieldType } from '../../types/form';

interface FieldEditorProps {
  field: FormField;
  onChange: (updatedField: FormField) => void;
  onDelete: () => void;
}

const FieldEditor: React.FC<FieldEditorProps> = ({ field, onChange, onDelete }) => {
  const [options, setOptions] = useState<FieldOption[]>(field.options || []);
  const [newOption, setNewOption] = useState('');
  
  useEffect(() => {
    if (field.options) {
      setOptions(field.options);
    }
  }, [field.options]);
  
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    onChange({
      ...field,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleValidationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const numValue = type === 'number' ? parseInt(value) : value;
    
    onChange({
      ...field,
      validation: {
        ...field.validation,
        [name]: numValue
      }
    });
  };
  
  const addOption = () => {
    if (newOption.trim() === '') return;
    
    const newOptionObj: FieldOption = {
      id: Math.random().toString(36).substr(2, 9),
      label: newOption,
      value: newOption.toLowerCase().replace(/\s+/g, '_')
    };
    
    const updatedOptions = [...options, newOptionObj];
    setOptions(updatedOptions);
    setNewOption('');
    
    onChange({
      ...field,
      options: updatedOptions
    });
  };
  
  const removeOption = (optionId: string) => {
    const updatedOptions = options.filter(opt => opt.id !== optionId);
    setOptions(updatedOptions);
    
    onChange({
      ...field,
      options: updatedOptions
    });
  };
  
  const showOptionsEditor = ['radio', 'checkbox', 'select'].includes(field.type);
  const showTextValidation = ['text', 'textarea', 'email'].includes(field.type);
  
  return (
    <div className="field-editor">
      <div className="field-editor-header">
        <h3>{getFieldTypeLabel(field.type)}</h3>
        <button className="delete-field-button" onClick={onDelete}>حذف</button>
      </div>
      
      <div className="field-editor-form">
        <div className="editor-field-group">
          <label htmlFor={`label-${field.id}`}>عنوان فیلد</label>
          <input
            type="text"
            id={`label-${field.id}`}
            name="label"
            value={field.label}
            onChange={handleFieldChange}
            placeholder="عنوان فیلد"
          />
        </div>
        
        <div className="editor-field-group">
          <label htmlFor={`placeholder-${field.id}`}>متن راهنما</label>
          <input
            type="text"
            id={`placeholder-${field.id}`}
            name="placeholder"
            value={field.placeholder || ''}
            onChange={handleFieldChange}
            placeholder="متن راهنما"
          />
        </div>
        
        <div className="editor-field-group">
          <label htmlFor={`description-${field.id}`}>توضیحات</label>
          <textarea
            id={`description-${field.id}`}
            name="description"
            value={field.description || ''}
            onChange={handleFieldChange}
            placeholder="توضیحات این فیلد"
          />
        </div>
        
        <div className="editor-field-group checkbox-group">
          <input
            type="checkbox"
            id={`required-${field.id}`}
            name="required"
            checked={field.required}
            onChange={handleFieldChange}
          />
          <label htmlFor={`required-${field.id}`}>این فیلد اجباری است</label>
        </div>
        
        {showTextValidation && (
          <div className="validation-section">
            <h4>اعتبارسنجی</h4>
            <div className="validation-fields">
              <div className="editor-field-group">
                <label htmlFor={`minLength-${field.id}`}>حداقل کاراکتر</label>
                <input
                  type="number"
                  id={`minLength-${field.id}`}
                  name="minLength"
                  value={field.validation?.minLength || ''}
                  onChange={handleValidationChange}
                  min="0"
                />
              </div>
              <div className="editor-field-group">
                <label htmlFor={`maxLength-${field.id}`}>حداکثر کاراکتر</label>
                <input
                  type="number"
                  id={`maxLength-${field.id}`}
                  name="maxLength"
                  value={field.validation?.maxLength || ''}
                  onChange={handleValidationChange}
                  min="0"
                />
              </div>
            </div>
          </div>
        )}
        
        {showOptionsEditor && (
          <div className="options-editor">
            <h4>گزینه‌ها</h4>
            <div className="options-list">
              {options.map((option) => (
                <div key={option.id} className="option-item">
                  <span>{option.label}</span>
                  <button
                    type="button"
                    className="remove-option-button"
                    onClick={() => removeOption(option.id)}
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
            <div className="add-option-form">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="گزینه جدید"
              />
              <button type="button" onClick={addOption}>افزودن</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


const getFieldTypeLabel = (type: FieldType): string => {
  const typeLabels: Record<string, string> = {
    text: 'متن کوتاه',
    textarea: 'متن بلند',
    email: 'ایمیل',
    radio: 'انتخاب تکی',
    checkbox: 'چند انتخابی',
    select: 'لیست کشویی'
  };
  
  return typeLabels[type] || 'نامشخص';
};

export default FieldEditor;