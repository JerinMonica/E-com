import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Page components
import Home from './Pages/Home';
import Product from './Pages/Product';
import Admin from './Pages/Admin';
import Cart from './Pages/Cart';
import Deliver from './Pages/Deliver';
import OrderPage from './Pages/OrderPage'; // ✅ New import
import Userpage from './Pages/Userpage';
import Login from './Pages/Login';



import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/userpage" element={<Userpage />} />

        {/* 🔐 Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/product" element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/productlist" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/zz" element={<ProtectedRoute><Sample /></ProtectedRoute>} />
        <Route path="/order" element={<ProtectedRoute><Deliver /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><OrderPage /></ProtectedRoute>} /> {/* ✅ NEW ROUTE */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
