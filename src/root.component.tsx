import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TenantsList from './components/TenantsList';
import TenantForm from './components/TenantsForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/tenants" element={<TenantsList />} />
        <Route path="/tenants/new" element={<TenantForm />} />
        <Route path="/tenants/edit/:id" element={<TenantForm />} />
      </Routes>
    </Router>
  );
};

export default App;
