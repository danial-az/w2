import { Form, FormField, FormResponse, FormStats } from '../types/form';


const FORMS_STORAGE_KEY = 'form_builder_forms';
const RESPONSES_STORAGE_KEY = 'form_builder_responses';

export const formService = {


  
  getFormPublicUrl(formId: string): string {
    return `/form/${formId}`;
  },
  
  
  getFormStatsUrl(formId: string): string {
    return `/form/${formId}/stats`;
  },
  
  
  async isFormPublished(formId: string): Promise<boolean> {
    const form = await this.getFormById(formId);
    return form ? form.published : false;
  },



  
  async getUserForms(userId: string): Promise<Form[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedForms = localStorage.getItem(FORMS_STORAGE_KEY);
        const forms: Form[] = storedForms ? JSON.parse(storedForms) : [];
        resolve(forms.filter(form => form.userId === userId));
      }, 500);
    });
  },

  
  async getFormById(formId: string): Promise<Form | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedForms = localStorage.getItem(FORMS_STORAGE_KEY);
        const forms: Form[] = storedForms ? JSON.parse(storedForms) : [];
        const form = forms.find(f => f.id === formId) || null;
        resolve(form);
      }, 300);
    });
  },

  
  async createForm(userId: string, formData: Partial<Form>): Promise<Form> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedForms = localStorage.getItem(FORMS_STORAGE_KEY);
        const forms: Form[] = storedForms ? JSON.parse(storedForms) : [];
        
        const now = new Date().toISOString();
        const newForm: Form = {
          id: Math.random().toString(36).substr(2, 9),
          title: formData.title || 'فرم بدون عنوان',
          description: formData.description || '',
          fields: formData.fields || [],
          createdAt: now,
          updatedAt: now,
          published: false,
          userId,
          responsesCount: 0
        };
        
        forms.push(newForm);
        localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(forms));
        resolve(newForm);
      }, 500);
    });
  },

  
  async updateForm(formId: string, formData: Partial<Form>): Promise<Form> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedForms = localStorage.getItem(FORMS_STORAGE_KEY);
        const forms: Form[] = storedForms ? JSON.parse(storedForms) : [];
        
        const formIndex = forms.findIndex(f => f.id === formId);
        if (formIndex === -1) {
          reject(new Error('فرم یافت نشد'));
          return;
        }
        
        const updatedForm = {
          ...forms[formIndex],
          ...formData,
          updatedAt: new Date().toISOString()
        };
        
        forms[formIndex] = updatedForm;
        localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(forms));
        resolve(updatedForm);
      }, 500);
    });
  },

  
  async deleteForm(formId: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedForms = localStorage.getItem(FORMS_STORAGE_KEY);
        const forms: Form[] = storedForms ? JSON.parse(storedForms) : [];
        
        const newForms = forms.filter(f => f.id !== formId);
        localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(newForms));
        
        const storedResponses = localStorage.getItem(RESPONSES_STORAGE_KEY);
        const responses: FormResponse[] = storedResponses ? JSON.parse(storedResponses) : [];
        const newResponses = responses.filter(r => r.formId !== formId);
        localStorage.setItem(RESPONSES_STORAGE_KEY, JSON.stringify(newResponses));
        
        resolve(true);
      }, 500);
    });
  },

  
  async togglePublishForm(formId: string): Promise<Form> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedForms = localStorage.getItem(FORMS_STORAGE_KEY);
        const forms: Form[] = storedForms ? JSON.parse(storedForms) : [];
        
        const formIndex = forms.findIndex(f => f.id === formId);
        if (formIndex === -1) {
          reject(new Error('فرم یافت نشد'));
          return;
        }
        
        const updatedForm = {
          ...forms[formIndex],
          published: !forms[formIndex].published,
          updatedAt: new Date().toISOString()
        };
        
        forms[formIndex] = updatedForm;
        localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(forms));
        resolve(updatedForm);
      }, 300);
    });
  },


  async getFormResponses(formId: string): Promise<FormResponse[]> {
    return new Promise((resolve) => {
      setTimeout(() => {  
        resolve([]);
      }, 300);
    });
  },

 
  async getFormStats(formId: string): Promise<FormStats> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalResponses: 0,
          completionRate: 0,
          averageCompletionTime: 0,
          fieldStats: {}
        });
      }, 300);
    });
  },


};