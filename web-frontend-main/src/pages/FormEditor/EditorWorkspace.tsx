import React from 'react';
import { Form, FormField, FieldType } from '../../types/form';
import EditorSidebar from './EditorSidebar';
import FormPreview from '../../components/FormBuilder/FormPreview';

interface EditorWorkspaceProps {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  selectedFieldId: string | null;
  setSelectedFieldId: React.Dispatch<React.SetStateAction<string | null>>;
  showFieldTypes: boolean;
  setShowFieldTypes: React.Dispatch<React.SetStateAction<boolean>>;
  getFieldTypeLabel: (type: FieldType) => string;
  getDefaultLabelForType: (type: FieldType) => string;
}

const EditorWorkspace: React.FC<EditorWorkspaceProps> = ({
  form,
  setForm,
  selectedFieldId,
  setSelectedFieldId,
  showFieldTypes,
  setShowFieldTypes,
  getFieldTypeLabel,
  getDefaultLabelForType
}) => {
  const handleSelectFieldType = (type: FieldType) => {
    const newField: FormField = {
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      label: getDefaultLabelForType(type),
      placeholder: '',
      required: false,
      options: ['radio', 'checkbox', 'select'].includes(type) ? [
        { id: '1', label: 'گزینه 1', value: 'option1' },
        { id: '2', label: 'گزینه 2', value: 'option2' }
      ] : undefined
    };
    
    setForm(prevForm => ({
      ...prevForm,
      fields: [...prevForm.fields, newField],
      updatedAt: new Date().toISOString()
    }));
    
    setSelectedFieldId(newField.id);
    setShowFieldTypes(false);
  };
  
  const handleUpdateField = (updatedField: FormField) => {
    setForm(prevForm => ({
      ...prevForm,
      fields: prevForm.fields.map(field => 
        field.id === updatedField.id ? updatedField : field
      ),
      updatedAt: new Date().toISOString()
    }));
  };
  
  const handleDeleteField = (fieldId: string) => {
    setForm(prevForm => ({
      ...prevForm,
      fields: prevForm.fields.filter(field => field.id !== fieldId),
      updatedAt: new Date().toISOString()
    }));
    
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    }
  };
  
  const handleMoveField = (fieldId: string, direction: 'up' | 'down') => {
    const fieldIndex = form.fields.findIndex(f => f.id === fieldId);
    if (fieldIndex === -1) return;
    
    const newFields = [...form.fields];
    
    if (direction === 'up' && fieldIndex > 0) {
      [newFields[fieldIndex], newFields[fieldIndex - 1]] = [newFields[fieldIndex - 1], newFields[fieldIndex]];
    } else if (direction === 'down' && fieldIndex < newFields.length - 1) {
      [newFields[fieldIndex], newFields[fieldIndex + 1]] = [newFields[fieldIndex + 1], newFields[fieldIndex]];
    } else {
      return;
    }
    
    setForm(prevForm => ({
      ...prevForm,
      fields: newFields,
      updatedAt: new Date().toISOString()
    }));
  };
  
  const handleDuplicateField = (fieldId: string) => {
    const fieldToDuplicate = form.fields.find(f => f.id === fieldId);
    if (!fieldToDuplicate) return;
    
    const duplicatedField: FormField = {
      ...fieldToDuplicate,
      id: Math.random().toString(36).substr(2, 9),
      label: `${fieldToDuplicate.label} (کپی)`
    };
    
    const fieldIndex = form.fields.findIndex(f => f.id === fieldId);
    const newFields = [...form.fields];
    newFields.splice(fieldIndex + 1, 0, duplicatedField);
    
    setForm(prevForm => ({
      ...prevForm,
      fields: newFields,
      updatedAt: new Date().toISOString()
    }));
    
    setSelectedFieldId(duplicatedField.id);
  };

  return (
    <div className="editor-workspace">
      <EditorSidebar
        form={form}
        selectedFieldId={selectedFieldId}
        setSelectedFieldId={setSelectedFieldId}
        showFieldTypes={showFieldTypes}
        setShowFieldTypes={setShowFieldTypes}
        onSelectFieldType={handleSelectFieldType}
        onUpdateField={handleUpdateField}
        onDeleteField={handleDeleteField}
        onMoveField={handleMoveField}
        onDuplicateField={handleDuplicateField}
        getFieldTypeLabel={getFieldTypeLabel}
      />
      
      <div className="form-preview-panel">
        <h3 className="preview-title">پیش‌نمایش فرم</h3>
        <FormPreview 
          form={form}
          onSelectField={setSelectedFieldId}
          selectedFieldId={selectedFieldId}
        />
      </div>
    </div>
  );
};

export default EditorWorkspace; 