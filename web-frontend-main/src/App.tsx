import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  FormBuilderLayout,
  PublicFormPage,
  PublicFormStatsPage,
  NotFoundPage
} from './pages';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/form-builder/*" element={<FormBuilderLayout />} />
          <Route path="/form/:formId" element={<PublicFormPage />} />
          <Route path="/form/:formId/stats" element={<PublicFormStatsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;