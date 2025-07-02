import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.userid) {
      axios.get(`http://localhost:5000/orders/${user.userid}`)
        .then(res => setOrders(res.data))
        .catch(err => console.error('Error fetching orders:', err));
    }
  }, []);

  return (
    <div className="container mt-4">
      <h3>🧾 Your Orders</h3>
      {orders.length === 0 ? (
        <div className="alert alert-info mt-3">No orders found.</div>
      ) : (
        orders.map(order => (
          <div key={order.orderid} className="card p-3 mb-3 shadow-sm">
            <h5>Order ID: {order.orderid}</h5>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.productname} - Qty: {item.quantity} - ₹{item.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
