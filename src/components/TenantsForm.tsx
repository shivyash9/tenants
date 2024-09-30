import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './TenantsForm.css';

const TenantForm: React.FC = () => {
  const [name, setName] = useState<string>(''); 
  const [description, setDescription] = useState<string>(''); 
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 

  useEffect(() => {
    if (id) {
      fetchTenant(id); 
    }
  }, [id]);

  const fetchTenant = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tenants/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setName(response.data.name);
      setDescription(response.data.description);
    } catch (err) {
      setError('Failed to fetch tenant.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { name, description };
      if (id) {
        await axios.patch(`http://localhost:3000/api/tenants/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('http://localhost:3000/api/tenants', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      navigate('/tenants'); 
    } catch (err) {
      setError('Failed to submit tenant.');
    }
  };

  return (
    <div className="tenant-form-container">
      <h2>{id ? 'Edit Tenant' : 'Add New Tenant'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="tenant-form">
        <div className="form-group">
          <label>Tenant Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update Tenant' : 'Add Tenant'}
        </button>
      </form>
    </div>
  );
};

export default TenantForm;
