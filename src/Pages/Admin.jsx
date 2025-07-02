import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const API_BASE = 'http://localhost:5000/products';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    image: null,
    description: '',
    category: '',
    currentImage: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_BASE);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('stock', form.stock);
    formData.append('description', form.description);
    formData.append('category', form.category);
    if (form.image) {
      formData.append('image', form.image);
    }

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/${editingId}`, formData, config);
      } else {
        await axios.post(API_BASE, formData, config);
      }

      setForm({
        name: '',
        price: '',
        stock: '',
        image: null,
        description: '',
        category: '',
        currentImage: ''
      });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: null,
      description: product.description,
      category: product.category,
      currentImage: product.image
    });
    setEditingId(product.productid);
  };

  const handleDelete = async (productid) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_BASE}/${productid}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="admin-container">
      <style>{`
        * { box-sizing: border-box; }

        .admin-container {
          padding: 20px;
          max-width: 100%;
        }

        form {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 20px;
        }

        form input {
          flex: 1 1 200px;
          padding: 5px;
          min-width: 150px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        form button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        form button:hover {
          background-color: #0056b3;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
          overflow-x: auto;
        }

        th, td {
          text-align: left;
          padding: 12px;
          border: 1px solid #ddd;
        }

        th {
          background-color: #f1f1f1;
        }

        tr:hover {
          background-color: #f9f9f9;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        button {
          margin-right: 5px;
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:first-of-type {
          background-color: #28a745;
          color: white;
        }

        button:first-of-type:hover {
          background-color: #218838;
        }

        button:last-of-type {
          background-color: #dc3545;
          color: white;
        }

        button:last-of-type:hover {
          background-color: #c82333;
        }

        img {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
        }

        @media (max-width: 768px) {
          form {
            flex-direction: column;
          }

          form input {
            width: 100%;
          }

          table, thead, tbody, th, td, tr {
            display: block;
          }

          thead {
            display: none;
          }

          td {
            position: relative;
            padding-left: 50%;
            text-align: left;
          }

          td::before {
            position: absolute;
            top: 12px;
            left: 12px;
            width: 45%;
            white-space: nowrap;
            font-weight: bold;
            content: attr(data-label);
          }
        }
      `}</style>

      <Navbar />
      <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>🛠️ Admin Product Manager</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} required={!editingId} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Product</button>
      </form>

      <h3>📦 All Products</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Image</th><th>Description</th><th>Category</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.productid}>
              <td data-label="ID">{prod.productid}</td>
              <td data-label="Name">{prod.name}</td>
              <td data-label="Price">₹{prod.price}</td>
              <td data-label="Stock">{prod.stock}</td>
              <td data-label="Image">
                <img
                  src={`http://localhost:5000/static/uploads/${prod.image}`}
                  alt={prod.name}
                  width="50"
                  height="50"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/50';
                  }}
                />
              </td>
              <td data-label="Description">{prod.description}</td>
              <td data-label="Category">{prod.category}</td>
              <td data-label="Actions">
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button onClick={() => handleEdit(prod)}>Edit</button>
                  <button onClick={() => handleDelete(prod.productid)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
