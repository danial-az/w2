import React from 'react';
import { FieldType } from '../../types/form';

interface FieldTypeItemProps {
  type: FieldType;
  label: string;
  icon: string;
  onSelect: (type: FieldType) => void;
}

const FieldTypeItem: React.FC<FieldTypeItemProps> = ({ type, label, icon, onSelect }) => {
  return (
    <div className="field-type-item" onClick={() => onSelect(type)}>
      <div className="field-type-icon">{icon}</div>
      <div className="field-type-label">{label}</div>
    </div>
  );
};

interface FieldTypesProps {
  onSelectFieldType: (type: FieldType) => void;
}

const FieldTypes: React.FC<FieldTypesProps> = ({ onSelectFieldType }) => {
  const fieldTypes: { type: FieldType; label: string; icon: string }[] = [
    { type: 'text', label: 'متن کوتاه', icon: 'Aa' },
    { type: 'textarea', label: 'متن بلند', icon: '¶' },
    { type: 'email', label: 'ایمیل', icon: '@' },
    { type: 'radio', label: 'انتخاب تکی', icon: '◉' },
    { type: 'checkbox', label: 'چند انتخابی', icon: '☑' },
    { type: 'select', label: 'لیست کشویی', icon: '▼' }
  ];
  
  return (
    <div className="field-types-container">
      <h3 className="field-types-header">انتخاب نوع فیلد</h3>
      <div className="field-types-grid">
        {fieldTypes.map(fieldType => (
          <FieldTypeItem
            key={fieldType.type}
            type={fieldType.type}
            label={fieldType.label}
            icon={fieldType.icon}
            onSelect={onSelectFieldType}
          />
        ))}
      </div>
    </div>
  );
};

export default FieldTypes;