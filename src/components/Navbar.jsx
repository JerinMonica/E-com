import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg py-3"
        style={{
          background: 'linear-gradient(90deg,rgb(21, 21, 34),rgb(69, 74, 88))',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap">
          {/* Brand Logo */}
          <Link className="navbar-brand" to="/">
            <img src="/logo.png" alt="Logo" style={{ height: '70px', width: '150px' }} />
          </Link>

          {/* Search Box */}
          <form className="d-flex mx-auto search-form">
            <input
              className="form-control rounded-start-pill px-4"
              type="search"
              placeholder="Search for products, brands and more"
              aria-label="Search"
            />
            <button className="btn btn-warning rounded-end-pill fw-semibold px-4" type="submit">
              🔍
            </button>
          </form>

          {/* Navigation Links */}
          <ul className="navbar-nav d-flex flex-row gap-3 align-items-center mb-0">
            <li className="nav-item">
              <Link to="/" className={`nav-link text-white fw-semibold ${isActive('/') ? 'active-tab home' : ''}`}>
                🏠 Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/product" className={`nav-link text-white fw-semibold ${isActive('/product') ? 'active-tab product' : ''}`}>
                🛍️ Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/order" className={`nav-link text-white fw-semibold ${isActive('/order') ? 'active-tab deliver' : ''}`}>
                🚚 Delivery
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link text-white">
                🛒 Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/userpage" className="nav-link text-white">
                👤 Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-link text-white fw-semibold">
                🛠️ Admin
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Styles */}
      <style>{`
        .search-form input {
          border: none;
          height: 45px;
          min-width: 300px;
        }

        .nav-link {
          padding: 8px 18px;
          border-radius: 30px;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .home {
          background: linear-gradient(135deg, #ff6b6b, #ff8e53);
        }

        .product {
          background: linear-gradient(135deg, #56ccf2, #2f80ed);
        }

        .deliver {
          background: linear-gradient(135deg, #42e695, #3bb2b8);
        }

        .active-tab {
          border: 2px solid white;
        }

        .nav-link:hover {
          transform: translateY(-2px);
          opacity: 0.95;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .search-form {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            margin-top: 10px;
          }
          .search-form input {
            width: 100%;
            margin-bottom: 10px;
          }
          .navbar-nav {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
