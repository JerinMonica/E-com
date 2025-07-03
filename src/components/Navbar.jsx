import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg py-3"
        style={{
          background: 'linear-gradient(90deg, #141e30, #243b55)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between gap-3 flex-wrap">
          {/* Brand Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="/logo.png" alt="Logo" style={{ height: '45px', width: 'auto' }} />
          </Link>

          {/* Search Box */}
          <form className="d-flex align-items-center search-form ms-2 me-auto">
            <input
              className="form-control search-input"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
            />
            <button className="btn search-btn" type="submit">
              🔍
            </button>
          </form>

          {/* Navigation Links */}
          <ul className="navbar-nav d-flex flex-row gap-3 align-items-center mb-0">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive('/') ? 'active-tab home' : ''}`}>
                🏠 Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/product" className={`nav-link ${isActive('/product') ? 'active-tab product' : ''}`}>
                🛍️ Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/order" className={`nav-link ${isActive('/order') ? 'active-tab deliver' : ''}`}>
                🚚 Delivery
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                🛒 Cart
              </Link>
            </li>

            {/* Admin Only */}
            {user?.role === 'admin' && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  🛠️ Admin
                </Link>
              </li>
            )}

            {/* Auth Controls */}
            {!user ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    🔐 Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/userpage" className="nav-link">
                    📝 Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link">👋 {user.name} ({user.role})</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Styles */}
      <style>{`
        .search-form {
          max-width: 400px;
          flex-grow: 1;
        }

        .search-input {
          border: none;
          height: 40px;
          border-top-left-radius: 50px;
          border-bottom-left-radius: 50px;
          padding-left: 16px;
          width: 100%;
        }

        .search-btn {
          background-color: #f0ad4e;
          color: black;
          border-top-right-radius: 50px;
          border-bottom-right-radius: 50px;
          font-weight: 600;
          padding: 0 16px;
          height: 40px;
        }

        .nav-link {
          color: #ffffff;
          padding: 8px 16px;
          font-weight: 500;
          border-radius: 30px;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .active-tab {
          border: 2px solid white;
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

        @media (max-width: 768px) {
          .container-fluid {
            flex-direction: column;
            align-items: flex-start;
          }

          .search-form {
            width: 100%;
            margin: 10px 0;
          }

          .navbar-nav {
            flex-direction: column;
            gap: 8px;
            width: 100%;
            align-items: flex-start;
          }

          .nav-item {
            width: 100%;
          }

          .nav-link, .btn {
            width: 100%;
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;

