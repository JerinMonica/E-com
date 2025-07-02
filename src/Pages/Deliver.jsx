import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialItems = location.state?.items || [];

  const user = JSON.parse(localStorage.getItem('user'));
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [upiPin, setUpiPin] = useState('');
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' });
  const [orderItems, setOrderItems] = useState(initialItems);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const countryData = {
    India: {
      "Tamil Nadu": ["Chennai", "Madurai", "Tirunelveli", "Salem", "Nagercoil", "Marthandam", "Karungal"],
      Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
      Maharashtra: ["Mumbai", "Pune", "Nagpur"],
      Delhi: ["New Delhi", "Old Delhi"]
    },
    USA: {
      California: ["Los Angeles", "San Francisco"],
      Texas: ["Houston", "Dallas"]
    },
    Canada: {
      Ontario: ["Toronto", "Ottawa"],
      Quebec: ["Montreal", "Quebec City"]
    }
  };

  const phoneRegex = {
    India: /^[6-9]\d{9}$/,
    USA: /^[2-9]\d{2}[2-9]\d{2}\d{4}$/,
    Canada: /^[2-9]\d{2}[2-9]\d{2}\d{4}$/,
  };

  const availableCountries = Object.keys(countryData);
  const availableStates = country ? Object.keys(countryData[country]) : [];
  const availableCities = country && state ? countryData[country][state] : [];

  const handleQuantityChange = (index, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    const updatedItems = [...orderItems];
    updatedItems[index].quantity = qty;
    setOrderItems(updatedItems);
  };

  const validateCreditCard = () => {
    const { number, expiry, cvv } = card;
    return (
      number.length === 16 &&
      expiry.match(/^(0[1-9]|1[0-2])\/[0-9]{2}$/) &&
      cvv.length === 3
    );
  };

  const validatePhone = () => {
    const regex = phoneRegex[country] || /^\d{10}$/;
    return regex.test(phone);
  };

  const handlePlaceOrder = () => {
    if (!user || !user.userid) {
      alert('⚠️ You must be logged in to place an order.');
      navigate('/login');
      return;
    }

    if (!address.trim()) {
      alert('📍 Please enter your address.');
      return;
    }

    if (!validatePhone()) {
      alert('📞 Please enter a valid phone number for ' + country);
      return;
    }

    if (!country || !state || !city) {
      alert('🌍 Please select Country, State, and City.');
      return;
    }

    if (paymentMethod === 'UPI') {
      if (!upiPin || upiPin.length < 4 || upiPin.length > 6) {
        alert('🔐 Please enter a valid UPI PIN (4-6 digits).');
        return;
      }
      if (upiPin !== '1234') {
        alert('❌ Incorrect UPI PIN. Payment failed.');
        return;
      }
    }

    if (paymentMethod === 'Credit Card' && !validateCreditCard()) {
      alert('❌ Please enter valid credit card details.');
      return;
    }

    setShowConfirmation(true);
  };

  const confirmFinalOrder = async () => {
    const orderData = {
      userid: user.userid,
      name: user.name,
      email: user.email,
      phone,
      address,
      country,
      state,
      city,
      payment_method: paymentMethod,
      payment_status: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      items: orderItems
    };

    try {
      await axios.post('http://localhost:5000/order', orderData);
      setOrderConfirmed(true);
    } catch (err) {
      const msg = err.response?.data?.error || '❌ Failed to place order.';
      alert(msg);
      console.error(err);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="container mt-5">
        <h3 className="text-success">✅ Your order has been placed successfully!</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/orders')}>
          Go to My Orders
        </button>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="container mt-5">
        <h3 className="mb-3">🧾 Confirm Your Order Summary</h3>
        <ul className="list-group">
          <li className="list-group-item">👤 Name: {user.name}</li>
          <li className="list-group-item">📧 Email: {user.email}</li>
          <li className="list-group-item">📞 Phone: {phone}</li>
          <li className="list-group-item">📍 Address: {address}, {city}, {state}, {country}</li>
          <li className="list-group-item">💳 Payment Method: {paymentMethod}</li>
          <li className="list-group-item">
            🛒 Items:
            <ul>
              {orderItems.map((item, i) => (
                <li key={i}>
                  <img
                    src={`http://localhost:5000/static/uploads/${item.image}`}
                    alt={item.name}
                    width="60"
                    style={{ marginRight: '10px' }}
                  />
                  <strong>{item.name}</strong> - Qty: {item.quantity} - ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <button className="btn btn-success mt-4" onClick={confirmFinalOrder}>
          ✅ Confirm Order
        </button>
        <button className="btn btn-secondary mt-2 ms-3" onClick={() => setShowConfirmation(false)}>
          ⬅️ Edit Details
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-3">🧾 Confirm Your Order</h3>

      {orderItems.map((item, index) => (
        <div key={index} className="card mb-3 p-3 shadow-sm">
          <div className="row">
            <div className="col-md-3">
              <img
                src={`http://localhost:5000/static/uploads/${item.image}`}
                alt={item.name}
                className="img-fluid rounded"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                }}
              />
            </div>
            <div className="col-md-9">
              <h5>{item.name}</h5>
              <p className="text-muted">{item.description}</p>
              <div className="row mb-2">
                <div className="col-sm-6 d-flex align-items-center">
                  <label className="me-2">🧾 Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    style={{ width: '100px' }}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <label>📦 Available Stock:</label>
                  <p className="form-control bg-light">{item.stock}</p>
                </div>
              </div>
              <p>💰 Price per unit: ₹{item.price}</p>
              <p>🧮 Total: ₹{item.price * item.quantity}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Address */}
      <div className="form-group mt-4">
        <label>📦 Address</label>
        <textarea className="form-control" rows="2" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>

      {/* Phone */}
      <div className="form-group mt-3">
        <label>📞 Phone Number</label>
        <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      {/* Country/State/City */}
      <div className="form-group mt-3">
        <label>🌍 Country</label>
        <select className="form-control" value={country} onChange={(e) => { setCountry(e.target.value); setState(''); setCity(''); }}>
          <option value="">-- Select Country --</option>
          {availableCountries.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
        </select>
      </div>

      {country && (
        <div className="form-group mt-3">
          <label>🗺️ State</label>
          <select className="form-control" value={state} onChange={(e) => { setState(e.target.value); setCity(''); }}>
            <option value="">-- Select State --</option>
            {availableStates.map((s, idx) => <option key={idx} value={s}>{s}</option>)}
          </select>
        </div>
      )}

      {state && (
        <div className="form-group mt-3">
          <label>🏙️ City</label>
          <select className="form-control" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">-- Select City --</option>
            {availableCities.map((ct, idx) => <option key={idx} value={ct}>{ct}</option>)}
          </select>
        </div>
      )}

      {/* Payment Method */}
      <div className="form-group mt-3">
        <label>💳 Payment Method</label>
        <select className="form-control" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Credit Card">Credit Card</option>
        </select>
      </div>

      {/* UPI */}
      {paymentMethod === 'UPI' && (
        <div className="form-group mt-3">
          <label>🔐 UPI PIN</label>
          <input type="password" className="form-control" maxLength="6" placeholder="Enter 4-6 digit PIN" value={upiPin} onChange={(e) => setUpiPin(e.target.value)} />
        </div>
      )}

      {/* Credit Card */}
      {paymentMethod === 'Credit Card' && (
        <div className="card mt-3 p-3">
          <div className="form-group mb-2">
            <label>💳 Card Number</label>
            <input type="text" className="form-control" maxLength="16" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />
          </div>
          <div className="form-group mb-2">
            <label>📅 Expiry (MM/YY)</label>
            <input type="text" className="form-control" maxLength="5" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
          </div>
          <div className="form-group">
            <label>🔐 CVV</label>
            <input type="password" className="form-control" maxLength="3" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} />
          </div>
        </div>
      )}

      <button className="btn btn-success mt-4" onClick={handlePlaceOrder}>
        ✅ Place Order
      </button>
    </div>
  );
};

export default OrderPage;
