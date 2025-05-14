import { FieldType, FormField } from '../types/form';

export const getDefaultLabelForType = (type: FieldType): string => {
  const labels: Record<FieldType, string> = {
    text: 'متن کوتاه',
    textarea: 'متن بلند',
    email: 'ایمیل',
    radio: 'انتخاب تکی',
    checkbox: 'چند انتخابی',
    select: 'لیست کشویی'
  };
  
  return labels[type] || 'فیلد جدید';
};

export const getFieldTypeLabel = (type: FieldType): string => {
  const typeLabels: Record<FieldType, string> = {
    text: 'متن کوتاه',
    textarea: 'متن بلند',
    email: 'ایمیل',
    radio: 'تکی',
    checkbox: 'چندتایی',
    select: 'کشویی'
  };
  
  return typeLabels[type] || 'نامشخص';
};

// This function returns string values, not JSX elements
export const renderResponseValueAsString = (value: any, field: FormField): string => {
  if (value === undefined || value === null || value === '') {
    return 'بدون پاسخ';
  }
  
  switch (field.type) {
    case 'radio':
    case 'select':
      const option = field.options?.find((opt) => opt.value === value);
      return option ? option.label : value;
    
    case 'checkbox':
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return 'بدون پاسخ';
        }
        
        return value.map(v => {
          const option = field.options?.find((opt) => opt.value === v);
          return option ? option.label : v;
        }).join(', ');
      }
      return value.toString();
    
    default:
      return value.toString();
  }
}; 