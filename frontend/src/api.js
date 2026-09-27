const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail.detail || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const getServices = () => request('/services/');
export const getBookings = () => request('/bookings/');
export const createCustomer = (customer) =>
  request('/customers/', { method: 'POST', body: JSON.stringify(customer) });
export const createBooking = (booking) =>
  request('/bookings/', { method: 'POST', body: JSON.stringify(booking) });
