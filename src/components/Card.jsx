import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Card = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => setData(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const getFirstProductOfEachCategory = () => {
    const seen = new Set();
    return data.filter(item => {
      if (!seen.has(item.category)) {
        seen.add(item.category);
        return true;
      }
      return false;
    });
  };

  const getCategoryProducts = (category) =>
    data.filter(item => item.category === category);

  const displayedProducts = selectedCategory
    ? getCategoryProducts(selectedCategory)
    : getFirstProductOfEachCategory();

  const handleAddToCart = (e, productid) => {
    e.stopPropagation();
    if (!productid) return alert("Invalid product ID");

    axios.post('http://localhost:5000/cart', {
      productid,
      quantity: 1
    })
      .then(() => alert('✅ Product added to cart!'))
      .catch((err) => {
        console.error('Add to cart error:', err.response?.data || err.message);
        alert(err.response?.data?.error || '❌ Failed to add to cart');
      });
  };

  const handleBuyNow = (e, prod) => {
    e.stopPropagation();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.userid) {
      alert('⚠️ Please login to continue.');
      navigate('/login');
      return;
    }

    navigate('/order', {
      state: {
        items: [{
          productid: prod.productid,
          name: prod.name,
          price: prod.price,
          quantity: 1,
          image: prod.image,
          description: prod.description
        }],
        user: {
          userid: user.userid,
          name: user.name,
          email: user.email
        }
      }
    });
  };

  return (
    <div>
      <style>{`
        .card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          min-height: 520px;
        }

        .card:hover {
          transform: scale(1.02);
          transition: 0.3s ease;
        }

        .product-img {
          width: 100%;
          height: 200px;
          object-fit: contain;
          border-radius: 8px;
        }

        .card-body {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .product-name {
          font-weight: 600;
          text-align: center;
          margin-top: 10px;
        }

        .product-price {
          text-align: center;
          margin-bottom: 5px;
        }

        .product-description {
          font-size: 14px;
          text-align: center;
          padding: 0 5px;
          height: 60px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .product-category {
          text-align: center;
          font-size: 13px;
          color: #777;
          margin-top: 5px;
        }

        .btn-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: auto;
        }

        .category-text {
          font-weight: 600;
          margin-top: 15px;
          text-align: center;
        }
      `}</style>

      <h3 className="text-center mt-4">
        {selectedCategory ? `Products in "${selectedCategory}"` : 'Product Categories'}
      </h3>

      {selectedCategory && (
        <div className="text-center mb-3">
          <button className="btn btn-secondary" onClick={() => setSelectedCategory(null)}>
            Back to Categories
          </button>
        </div>
      )}

      <div className="card-container d-flex flex-wrap justify-content-center gap-4 mt-3">
        {displayedProducts.map((prod) => (
          <div
            className="card p-3 shadow"
            key={prod.productid}
            style={{
              width: '18rem',
              borderRadius: '10px',
              backgroundColor: '#fff'
            }}
          >
            <img
              src={`http://localhost:5000/static/uploads/${prod.image || 'placeholder.jpg'}`}
              alt={prod.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
              }}
              className="product-img"
            />

            <div className="card-body mt-3">
              {selectedCategory ? (
                <>
                  <div className="text-center">
                    <h5 className="product-name">{prod.name}</h5>
                    <p className="product-price">₹{prod.price}</p>
                    <p className="product-description">{prod.description}</p>
                    <p className="product-category">Category: {prod.category}</p>
                  </div>

                  <div className="btn-group">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => handleBuyNow(e, prod)}
                    >
                      Buy Now
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => handleAddToCart(e, prod.productid)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="category-text">{prod.category}</p>
                  <div className="btn-group">
                    <button
                      className="btn btn-info"
                      onClick={() => setSelectedCategory(prod.category)}
                    >
                      View Products
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
