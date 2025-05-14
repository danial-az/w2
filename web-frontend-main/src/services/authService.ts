import { LoginCredentials, RegisterCredentials, User } from '../types';

const simulateNetworkDelay = async () => {
  return new Promise(resolve => setTimeout(resolve, 800));
};

const validateCredentials = (email: string, password: string): boolean => {
  return email.includes('@') && password.length >= 6;
};

export const login = async (credentials: LoginCredentials): Promise<User> => {
  await simulateNetworkDelay();
  
  const { email, password } = credentials;
  
  if (!validateCredentials(email, password)) {
    throw new Error('ایمیل یا رمز عبور نامعتبر است.');
  }
  
  const user: User = { id: '1', name: 'کاربر تست', email };
  localStorage.setItem('user', JSON.stringify(user));
  
  return user;
};

export const register = async (credentials: RegisterCredentials): Promise<User> => {
  await simulateNetworkDelay();
  
  const { email, password, name } = credentials;
  
  if (!validateCredentials(email, password)) {
    throw new Error('ایمیل یا رمز عبور نامعتبر است.');
  }
  
  const user: User = { id: '1', name: name || 'کاربر جدید', email };
  localStorage.setItem('user', JSON.stringify(user));
  
  return user;
};

export const logout = (): void => {
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};