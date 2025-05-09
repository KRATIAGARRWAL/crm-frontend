import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const fetchCustomer = async () => {
        try {
          const response = await api.get(`/customers/${id}`);
          setCustomer(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching customer:', error);
          setError('Failed to load customer data');
          setLoading(false);
        }
      };
      
      fetchCustomer();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setCustomer({
        ...customer,
        address: {
          ...customer.address,
          [addressField]: value
        }
      });
    } else {
      setCustomer({
        ...customer,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isEditMode) {
        await api.put(`/customers/${id}`, customer);
      } else {
        await api.post('/customers', customer);
      }
      navigate('/customers');
    } catch (error) {
      console.error('Error saving customer:', error);
      setError('Failed to save customer data');
    }
  };

  if (loading) {
    return <div className="loading">Loading customer data...</div>;
  }

  return (
    <div className="customer-form">
      <h1>{isEditMode ? 'Edit Customer' : 'Add New Customer'}</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Basic Information</h2>
          
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customer.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-section">
          <h2>Address</h2>
          
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="address.street"
              value={customer.address.street}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="address.city"
                value={customer.address.city}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="state">State/Province</label>
              <input
                type="text"
                id="state"
                name="address.state"
                value={customer.address.state}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="zipCode">Zip/Postal Code</label>
              <input
                type="text"
                id="zipCode"
                name="address.zipCode"
                value={customer.address.zipCode}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="address.country"
                value={customer.address.country}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/customers')}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {isEditMode ? 'Update Customer' : 'Add Customer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;