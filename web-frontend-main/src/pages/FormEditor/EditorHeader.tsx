import React from 'react';
import { Form } from '../../types/form';

interface EditorHeaderProps {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  isNew: boolean;
  onSave: () => void;
  onTogglePublish: () => void;
  onCancel: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ 
  form, 
  setForm, 
  isNew, 
  onSave, 
  onTogglePublish, 
  onCancel 
}) => {
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
      updatedAt: new Date().toISOString()
    }));
  };

  return (
    <div className="editor-header">
      <div className="form-title-section">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleFormChange}
          placeholder="عنوان فرم"
          className="form-title-input"
        />
        <textarea
          name="description"
          value={form.description || ''}
          onChange={handleFormChange}
          placeholder="توضیحات فرم (اختیاری)"
          className="form-description-input"
        />
      </div>
      
      <div className="editor-actions">
        <button className="save-form-button" onClick={onSave}>
          ذخیره فرم
        </button>
        {!isNew && (
          <button 
            className={`publish-form-button ${form.published ? 'unpublish' : 'publish'}`}
            onClick={onTogglePublish}
          >
            {form.published ? 'لغو انتشار' : 'انتشار فرم'}
          </button>
        )}
        <button className="cancel-button" onClick={onCancel}>
          انصراف
        </button>
      </div>
    </div>
  );
};

export default EditorHeader; 