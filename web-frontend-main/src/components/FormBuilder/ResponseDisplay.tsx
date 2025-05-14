import React from 'react';
import { FormField } from '../../types/form';
import { renderResponseValueAsString } from '../../utils/fieldUtils';

interface ResponseDisplayProps {
  value: any;
  field: FormField;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ value, field }) => {
  if (value === undefined || value === null || value === '') {
    return <span className="no-response">بدون پاسخ</span>;
  }
  
  if (field.type === 'checkbox' && Array.isArray(value) && value.length > 0) {
    return (
      <div className="checkbox-values">
        {value.map((v, i) => {
          const option = field.options?.find((opt) => opt.value === v);
          return (
            <span key={i} className="checkbox-value">
              {option ? option.label : v}
            </span>
          );
        })}
      </div>
    );
  }
  
  // For other types, just display the string value
  return <span>{renderResponseValueAsString(value, field)}</span>;
};

export default ResponseDisplay; 