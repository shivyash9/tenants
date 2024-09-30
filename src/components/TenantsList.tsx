import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TenantsList.css'; 

const TenantList: React.FC = () => {
  const [tenants, setTenants] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tenants', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setTenants(response.data);
    } catch (err) {
      setError('Failed to fetch tenants.');
    }
  };

  const handleDeleteTenant = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/tenants/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTenants(); 
    } catch (err) {
      setError('Failed to delete tenant.');
    }
  };

  return (
    <div className="tenant-container">
      <h2>Tenant Management</h2>
      {error && <p className="error">{error}</p>}
      <Link to="/tenants/new" className="btn btn-primary">Add New Tenant</Link>
      <table className="tenant-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>{tenant.id}</td>
              <td>{tenant.name}</td>
              <td>{tenant.email}</td>
              <td>
                <button onClick={() => handleDeleteTenant(tenant.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenantList;
