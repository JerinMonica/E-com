import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    axios.get('http://localhost:5000/cart')
      .then(res => setCartItems(res.data))
      .catch(err => {
        console.error('Error loading cart:', err);
        setCartItems([]);
      });
  };

  const handleRemove = (productid) => {
    axios.delete(`http://localhost:5000/cart/${productid}`)
      .then(fetchCart)
      .catch(err => console.error('Error deleting item:', err));
  };

  return (
    <div>
      <Navbar />
      <style>{`
        .cart-container {
          padding: 3rem 1rem;
          background-color: #f1f3f5;
          min-height: 100vh;
        }
        .cart-title {
          font-weight: bold;
          font-size: 2.2rem;
          text-align: center;
          margin-bottom: 3rem;
          color: #343a40;
        }
        .col {
          display: flex;
          justify-content: center;
        }
        .cart-card {
          height: 95%;
          width: 100%;
          max-width: 360px;
          background-color: #ffffff;
          border: none;
          border-radius: 1rem;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cart-card:hover {
          transform: scale(1.03);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
        .cart-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
          transition: transform 0.3s ease;
        }
        .cart-img:hover {
          transform: scale(1.05);
        }
        .cart-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
        }
        .cart-title-item {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .cart-description {
          font-size: 0.95rem;
          color: #6c757d;
          margin-bottom: 0.75rem;
          min-height: 50px;
          text-align: center;
        }
        .cart-price {
          font-weight: 500;
          color: #333;
          font-size: 1rem;
          text-align: center;
          margin-bottom: 1rem;
        }
        .cart-footer {
          padding: 1rem;
          border-top: 1px solid #e9ecef;
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }
        .cart-button {
          width: 100%;
          padding: 0.5rem 1.25rem;
          font-size: 0.9rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }
        .cart-button:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
        }
        .btn-success {
          background-color: #28a745;
          color: white;
          border: none;
        }
        .btn-success:hover {
          background-color: #218838;
        }
        .btn-outline-danger {
          border: 1px solid #dc3545;
          color: #dc3545;
        }
        .btn-outline-danger:hover {
          background-color: #dc3545;
          color: white;
        }
        .text-muted {
          color: #6c757d;
        }
      `}</style>

      <div className="container cart-container">
        <h3 className="cart-title">🛒 Your Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <p className="text-center fs-5 text-muted">Your cart is empty.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {cartItems.map(item => (
              <div key={item.cartid} className="col">
                <div className="card cart-card">
                  <img
                    src={`http://localhost:5000/static/uploads/${item.image}`}
                    alt={item.name}
                    className="cart-img"
                  />
                  <div className="card-body cart-body">
                    <h5 className="cart-title-item">{item.name}</h5>
                    <p className="cart-description">{item.description}</p>
                    <p className="cart-price">Price: ₹{item.price}</p>
                  </div>
                  <div className="card-footer cart-footer">
                    <button
                      className="btn btn-success cart-button"
                      onClick={() => navigate('/order', { state: { items: [item] } })}
                    >
                      Buy Now
                    </button>
                    <button
                      className="btn btn-outline-danger cart-button"
                      onClick={() => handleRemove(item.productid)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
