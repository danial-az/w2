import React from 'react';
import { Form, FormField, FieldType } from '../../types/form';
import FieldTypes from '../../components/FormBuilder/FieldTypes';
import FieldEditor from '../../components/FormBuilder/FieldEditor';


interface EditorSidebarProps {
  form: Form;
  selectedFieldId: string | null;
  setSelectedFieldId: React.Dispatch<React.SetStateAction<string | null>>;
  showFieldTypes: boolean;
  setShowFieldTypes: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectFieldType: (type: FieldType) => void;
  onUpdateField: (updatedField: FormField) => void;
  onDeleteField: (fieldId: string) => void;
  onMoveField: (fieldId: string, direction: 'up' | 'down') => void;
  onDuplicateField: (fieldId: string) => void;
  getFieldTypeLabel: (type: FieldType) => string;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
  form,
  selectedFieldId,
  setSelectedFieldId,
  showFieldTypes,
  setShowFieldTypes,
  onSelectFieldType,
  onUpdateField,
  onDeleteField,
  onMoveField,
  onDuplicateField,
  getFieldTypeLabel
}) => {
  if (showFieldTypes) {
    return (
      <div className="editor-sidebar">
        <div className="field-types-panel">
          <h3>افزودن فیلد جدید</h3>
          <FieldTypes onSelectFieldType={onSelectFieldType} />
          <button 
            className="cancel-button"
            onClick={() => setShowFieldTypes(false)}
          >
            انصراف
          </button>
        </div>
      </div>
    );
  }
  
  if (selectedFieldId) {
    const selectedField = form.fields.find(field => field.id === selectedFieldId);
    if (!selectedField) return null;
    
    return (
      <div className="editor-sidebar">
        <div className="field-editor-panel">
          <h3>ویرایش فیلد</h3>
          <FieldEditor
            field={selectedField}
            onChange={onUpdateField}
            onDelete={() => onDeleteField(selectedField.id)}
          />
          
          <div className="field-actions">
            <button 
              className="move-button up"
              onClick={() => onMoveField(selectedFieldId, 'up')}
              disabled={form.fields.findIndex(f => f.id === selectedFieldId) === 0}
            >
              انتقال به بالا
            </button>
            <button 
              className="move-button down"
              onClick={() => onMoveField(selectedFieldId, 'down')}
              disabled={form.fields.findIndex(f => f.id === selectedFieldId) === form.fields.length - 1}
            >
              انتقال به پایین
            </button>
            <button 
              className="duplicate-button"
              onClick={() => onDuplicateField(selectedFieldId)}
            >
              تکثیر فیلد
            </button>
          </div>
          
          <button 
            className="done-button"
            onClick={() => setSelectedFieldId(null)}
          >
            تایید
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="editor-sidebar">
      <div className="sidebar-actions">
        <button 
          className="add-field-button"
          onClick={() => setShowFieldTypes(true)}
        >
          افزودن فیلد جدید
        </button>
        <div className="form-fields-list">
          <h3>فیلدهای فرم</h3>
          {form.fields.length === 0 ? (
            <p className="empty-fields-message">هنوز فیلدی اضافه نشده است.</p>
          ) : (
            <div className="fields-list">
              {form.fields.map(field => (
                <div
                  key={field.id}
                  className={`field-list-item ${selectedFieldId === field.id ? 'selected' : ''}`}
                  onClick={() => setSelectedFieldId(field.id)}
                >
                  <span className="field-type-badge">{getFieldTypeLabel(field.type)}</span>
                  <span className="field-label">{field.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorSidebar; 