export type FieldType = 
  | 'text'
  | 'textarea'
  | 'email'
  | 'radio'
  | 'checkbox'
  | 'select';

export interface FieldOption {
  id: string;
  label: string;
  value: string;
}

export interface FormFieldValidation {
  minLength?: number;
  maxLength?: number;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: FieldOption[];
  description?: string;
  validation?: FormFieldValidation;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  createdAt: string;
  updatedAt: string;
  published: boolean;
  userId: string;
  responsesCount: number;
}

export interface FormResponse {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: string;
  submittedBy?: string;
}

export interface FormStats {
  totalResponses: number;
  completionRate: number;
  averageCompletionTime: number;
  fieldStats: Record<string, {
    responseRate: number;
    distribution?: Record<string, number>;
    average?: number;
  }>;
}