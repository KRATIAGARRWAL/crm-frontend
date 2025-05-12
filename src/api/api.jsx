// const BASE_URL = 'http://localhost:5000/api';
// const AI_URL = 'http://localhost:5001/api'; 
const BASE_URL = import.meta.env.VITE_BASE_URL;
const AI_URL = import.meta.env.VITE_AI_URL;
const token = localStorage.getItem('token');
const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

// ---- Customers ----
export const addCustomer = async (data) =>
  fetch(`${BASE_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
    },
    body: JSON.stringify(data),
  });

export const fetchCustomers = async () =>
  fetch(`${BASE_URL}/customers`, {
    headers: authHeader,
  }).then(res => res.json());

// ---- Orders ----
export const addOrder = async (data) =>
  fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
    },
    body: JSON.stringify(data),
  });

export const fetchOrders = async () =>
  fetch(`${BASE_URL}/orders`, {
    headers: authHeader,
  }).then(res => res.json());

// ---- Segments ----
export const saveSegment = async (segmentData) =>
  fetch(`${BASE_URL}/segments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
    },
    body: JSON.stringify(segmentData),
  });

export const fetchSegments = async () =>
  fetch(`${BASE_URL}/segments`, {
    headers: authHeader,
  }).then(res => res.json());

export const previewAudienceSize = async (data) =>
  fetch(`${BASE_URL}/segments/preview`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
    },
    body: JSON.stringify(data),
  }).then(res => res.json());


export const generateMessages = async (objective) => {
  try {
    const res = await fetch(`${AI_URL}/generate-messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ objective }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Non-OK response:", text);
      throw new Error('Failed to generate messages');
    }

    const data = await res.json();
    return data.messages || [];
  } catch (err) {
    console.error("Error in generateMessages:", err);
    throw err;
  }
};
