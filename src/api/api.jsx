const BASE_URL = 'http://localhost:5000/api';

// ---- Customers ----
export const addCustomer = async (data) =>
  fetch(`${BASE_URL}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const fetchCustomers = async () =>
  fetch(`${BASE_URL}/customers`).then(res => res.json());

// ---- Orders ----
export const addOrder = async (data) =>
  fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const fetchOrders = async () =>
  fetch(`${BASE_URL}/orders`).then(res => res.json());

// ---- Segments ----
export const saveSegment = async (segmentData) =>
  fetch(`${BASE_URL}/segments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(segmentData),
  });

export const fetchSegments = async () =>
  fetch(`${BASE_URL}/segments`).then(res => res.json());

export const previewAudienceSize = async (data) =>
  fetch(`${BASE_URL}/segments/preview`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());
