import { useEffect, useState } from 'react';
import { createBooking, createCustomer, getBookings, getServices } from './api';
import './App.css';

const initialForm = {
  full_name: '',
  email: '',
  phone: '',
  address: '',
  service_id: '',
  scheduled_at: '',
  notes: '',
};

function App() {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      const [serviceList, bookingList] = await Promise.all([getServices(), getBookings()]);
      setServices(serviceList);
      setBookings(bookingList);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setStatus(null);
    try {
      const customer = await createCustomer({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        address: form.address,
      });
      await createBooking({
        customer_id: customer.id,
        service_id: Number(form.service_id),
        scheduled_at: new Date(form.scheduled_at).toISOString(),
        notes: form.notes,
      });
      setStatus('Booking request submitted!');
      setForm(initialForm);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Sparkle Clean</h1>
        <p>Book a professional house cleaning in minutes.</p>
      </header>

      <section className="booking-section">
        <h2>Book a Cleaning</h2>
        <form onSubmit={handleSubmit} className="booking-form">
          <input
            name="full_name"
            placeholder="Full name"
            value={form.full_name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <select name="service_id" value={form.service_id} onChange={handleChange} required>
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} — ${service.base_price} ({service.duration_minutes} min)
              </option>
            ))}
          </select>
          <input
            name="scheduled_at"
            type="datetime-local"
            value={form.scheduled_at}
            onChange={handleChange}
            required
          />
          <textarea
            name="notes"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={handleChange}
          />
          <button type="submit">Request Booking</button>
        </form>
        {status && <p className="status success">{status}</p>}
        {error && <p className="status error">{error}</p>}
      </section>

      <section className="bookings-section">
        <h2>Recent Bookings</h2>
        <ul className="bookings-list">
          {bookings.map((booking) => (
            <li key={booking.id}>
              #{booking.id} — {new Date(booking.scheduled_at).toLocaleString()} —{' '}
              <span className={`badge ${booking.status}`}>{booking.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
