import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [customers, setCustomers] = useState([]);
  const [order, setOrder] = useState({
    customerId: '',
    items: [
      { product: '', quantity: 1, unitPrice: 0 }
    ],
    status: 'Pending',
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    notes: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [customersResponse] = await Promise.all([
          api.get('/customers')
        ]);
        
        setCustomers(customersResponse.data);
        
        if (isEditMode) {
          const orderResponse = await api.get(`/orders/${id}`);
          setOrder(orderResponse.data);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setError('Failed to load data');
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, [id, isEditMode]);

  // Handle customer change and auto-fill address
  const handleCustomerChange = async (e) => {
    const customerId = e.target.value;
    setOrder({
      ...order,
      customerId
    });
    
    if (customerId) {
      try {
        const response = await api.get(`/customers/${customerId}`);
        setOrder(prev => ({
          ...prev,
          customerId,
          shippingAddress: { ...response.data.address }
        }));
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...order.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    setOrder({
      ...order,
      items: updatedItems
    });
  };

  const addItem = () => {
    setOrder({
      ...order,
      items: [
        ...order.items,
        { product: '', quantity: 1, unitPrice: 0 }
      ]
    });
  };

  const removeItem = (index) => {
    if (order.items.length === 1) {
      return; // Keep at least one item
    }
    
    const updatedItems = [...order.items];
    updatedItems.splice(index, 1);
    
    setOrder({
      ...order,
      items: updatedItems
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const addressField = name.split('.')[1];
    
    setOrder({
      ...order,
      shippingAddress: {
        ...order.shippingAddress,
        [addressField]: value
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value
    });
  };

  const calculateTotal = () => {
    return order.items.reduce((total, item) => {
      return total + (Number(item.quantity) * Number(item.unitPrice));
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Calculate the total amount
    const totalAmount = calculateTotal();
    const orderData = {
      ...order,
      totalAmount
    };
    
    try {
      if (isEditMode) {
        await api.put(`/orders/${id}`, orderData);
      } else {
        await api.post('/orders', orderData);
      }
      navigate('/orders');
    } catch (error) {
      console.error('Error saving order:', error);
      setError('Failed to save order data');
    }
  };

  if (loading) {
    return <div className="loading">Loading order data...</div>;
  }

  return (
    <div className="order-form">
      <h1>{isEditMode ? 'Edit Order' : 'Create New Order'}</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Customer Information</h2>
          
          <div className="form-group">
            <label htmlFor="customerId">Select Customer</label>
            <select
              id="customerId"
              name="customerId"
              value={order.customerId}
              onChange={handleCustomerChange}
              required
            >
              <option value="">-- Select Customer --</option>
              {customers.map(customer => (
                <option key={customer._id} value={customer._id}>
                  {customer.name} ({customer.email})
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Order Status</label>
            <select
              id="status"
              name="status"
              value={order.status}
              onChange={handleChange}
              required
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        <div className="form-section">
          <h2>Order Items</h2>
          
          {order.items.map((item, index) => (
            <div key={index} className="item-row">
              <div className="form-group">
                <label htmlFor={`product-${index}`}>Product</label>
                <input
                  type="text"
                  id={`product-${index}`}
                  value={item.product}
                  onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group small">
                <label htmlFor={`quantity-${index}`}>Quantity</label>
                <input
                  type="number"
                  id={`quantity-${index}`}
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group small">
                <label htmlFor={`unitPrice-${index}`}>Unit Price</label>
                <input
                  type="number"
                  id={`unitPrice-${index}`}
                  step="0.01"
                  min="0"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group small">
                <label>Subtotal</label>
                <div className="calculated-value">
                  ${(item.quantity * item.unitPrice).toFixed(2)}
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="btn-remove-item"
                disabled={order.items.length === 1}
              >
                X
              </button>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addItem}
            className="btn-add-item"
          >
            Add Item
          </button>
                    
        </div>

        <div className="form-section">
          <h2>Shipping Address</h2>
          {['street', 'city', 'state', 'zipCode', 'country'].map((field) => (
            <div className="form-group" key={field}>
              <label htmlFor={`shippingAddress.${field}`}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                id={`shippingAddress.${field}`}
                name={`shippingAddress.${field}`}
                value={order.shippingAddress[field]}
                onChange={handleAddressChange}
                required
              />
            </div>
          ))}
        </div>

        <div className="form-section">
          <h2>Additional Notes</h2>
          <div className="form-group">
            <textarea
              name="notes"
              value={order.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Enter any special instructions or notes here..."
            />
          </div>
        </div>

        <div className="form-section total-section">
          <h2>Order Total</h2>
          <div className="total-value">
            ${calculateTotal().toFixed(2)}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {isEditMode ? 'Update Order' : 'Create Order'}
          </button>
          <button type="button" className="btn-cancel" onClick={() => navigate('/orders')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
