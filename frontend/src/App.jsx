import { useEffect, useState } from 'react';
import { createBooking, createCustomer, getBookings, getServices } from './api';
import { BadgeCheckIcon, BoxIcon, BroomIcon, ClockIcon, LeafIcon, ShieldIcon, SparkleIcon } from './icons';
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

const SERVICE_ICONS = {
  standard: BroomIcon,
  deep: SparkleIcon,
  'move-out': BoxIcon,
  'move out': BoxIcon,
};

function ServiceIcon({ name = '' }) {
  const key = Object.keys(SERVICE_ICONS).find((k) => name.toLowerCase().includes(k));
  const Icon = SERVICE_ICONS[key] || SparkleIcon;
  return <Icon />;
}

const FEATURES = [
  { Icon: ShieldIcon, title: 'Vetted & Insured', text: 'Every cleaner is background-checked and fully insured.' },
  { Icon: LeafIcon, title: 'Eco-Friendly Products', text: 'Safe, non-toxic supplies for your family and pets.' },
  { Icon: ClockIcon, title: 'On-Time, Every Time', text: 'Flexible scheduling that fits your life.' },
  { Icon: BadgeCheckIcon, title: 'Satisfaction Guaranteed', text: "Not happy? We'll make it right, free of charge." },
];

const INITIAL_REVIEWS = [
  {
    name: 'Maria G.',
    rating: 5,
    text: 'They transformed my apartment before a big family visit. Every corner sparkled — worth every penny!',
  },
  {
    name: 'James T.',
    rating: 5,
    text: 'Booked a move-out clean and got my full deposit back. The crew was fast, friendly, and thorough.',
  },
  {
    name: 'Priya R.',
    rating: 4,
    text: 'Consistent, reliable bi-weekly cleanings. Scheduling online takes two minutes. Highly recommend.',
  },
];

const initialReviewForm = { name: '', rating: 5, text: '' };

function App() {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [reviewForm, setReviewForm] = useState(initialReviewForm);

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

  const handleReviewChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviews([{ ...reviewForm, rating: Number(reviewForm.rating) }, ...reviews]);
    setReviewForm(initialReviewForm);
  };

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-wall" />
          <div className="hero-floor" />
          <div className="hero-scrim" />
        </div>
        <div className="hero-content">
          <span className="hero-eyebrow">Trusted Local House Cleaning</span>
          <h1>A spotless home, effortlessly maintained.</h1>
          <p>Book a professional cleaning in minutes — vetted, insured cleaners at your door.</p>
          <a href="#booking" className="hero-cta">Get a Free Quote</a>
        </div>
      </header>

      <section className="features">
        {FEATURES.map(({ Icon, title, text }) => (
          <div className="feature-card" key={title}>
            <span className="feature-icon-badge">
              <Icon />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </section>

      <main className="layout" id="booking">
        <section className="booking-section card">
          <h2>Book a Cleaning</h2>

          <div className="service-cards">
            {services.map((service) => (
              <button
                type="button"
                key={service.id}
                className={`service-card ${String(service.id) === form.service_id ? 'selected' : ''}`}
                onClick={() => setForm({ ...form, service_id: String(service.id) })}
              >
                <span className="service-icon">
                  <ServiceIcon name={service.name} />
                </span>
                <span className="service-name">{service.name}</span>
                <span className="service-price">${service.base_price}</span>
                <span className="service-duration">{service.duration_minutes} min</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-row">
              <label>
                Full name
                <input name="full_name" value={form.full_name} onChange={handleChange} required />
              </label>
              <label>
                Email
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
              </label>
            </div>
            <div className="form-row">
              <label>
                Phone
                <input name="phone" value={form.phone} onChange={handleChange} required />
              </label>
              <label>
                Date &amp; time
                <input
                  name="scheduled_at"
                  type="datetime-local"
                  value={form.scheduled_at}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <label>
              Address
              <input name="address" value={form.address} onChange={handleChange} required />
            </label>
            <label>
              Notes (optional)
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} />
            </label>
            <button type="submit" className="submit-btn" disabled={!form.service_id}>
              Request Booking
            </button>
          </form>
          {status && <p className="status success">{status}</p>}
          {error && <p className="status error">{error}</p>}
        </section>

        <section className="bookings-section card">
          <h2>Recent Bookings</h2>
          {bookings.length === 0 ? (
            <p className="empty-state">No bookings yet — be the first to request one!</p>
          ) : (
            <ul className="bookings-list">
              {bookings.map((booking) => (
                <li key={booking.id}>
                  <span className="booking-id">#{booking.id}</span>
                  <span className="booking-date">{new Date(booking.scheduled_at).toLocaleString()}</span>
                  <span className={`badge ${booking.status}`}>{booking.status}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <section className="reviews">
        <h2>What Our Customers Say</h2>
        <div className="review-cards">
          {reviews.map((review, i) => (
            <div className="review-card" key={`${review.name}-${i}`}>
              <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </div>
              <p className="review-text">“{review.text}”</p>
              <p className="review-name">— {review.name}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleReviewSubmit} className="review-form">
          <h3>Leave a Review</h3>
          <div className="form-row">
            <label>
              Name
              <input name="name" value={reviewForm.name} onChange={handleReviewChange} required />
            </label>
            <label>
              Rating
              <select name="rating" value={reviewForm.rating} onChange={handleReviewChange}>
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {'★'.repeat(n)}
                    {'☆'.repeat(5 - n)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Your review
            <textarea
              name="text"
              value={reviewForm.text}
              onChange={handleReviewChange}
              rows={3}
              required
            />
          </label>
          <button type="submit" className="submit-btn">
            Submit Review
          </button>
        </form>
      </section>

      <footer className="footer">
        <p>Sparkle Clean — Professional House Cleaning Services</p>
      </footer>
    </div>
  );
}

export default App;
