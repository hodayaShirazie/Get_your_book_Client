
// import React from 'react';
// import './AddProduct.css';


// export default function AddProduct() {
//   return (
//     <div className="form-container">
//       <h2>Add Product</h2>
//       <form>
//         <label htmlFor="productName">Product Name</label>
//         <input type="text" id="productName" pattern="[A-Za-z0-9 ]+" required />

//         <label htmlFor="description">Description (optional)</label>
//         <input type="text" id="description" />

//         <label htmlFor="category">Category</label>
//         <select id="category" required>
//           <option value="">Select a Category</option>
//           <option value="quick">Quick Reads</option>
//           <option value="epic">Epic Journeys</option>
//           <option value="top">Top Picks</option>
//           <option value="shared">Shared Stories</option>
//         </select>

//         <label htmlFor="price">Price</label>
//         <input type="number" id="price" min="0" required />

//         <label htmlFor="image">Image URL</label>
//         <input type="text" id="image" />

//         <label htmlFor="stock">Initial Stock Quantity</label>
//         <input type="number" id="stock" min="0" required />

//         <label htmlFor="threshold">Minimum Stock Threshold</label>
//         <input type="number" id="threshold" min="1" max="99999" defaultValue="10" required />

//         <div className="buttons">
//           <button type="submit" className="confirm">Confirm</button>
//           <button type="reset" className="cancel">Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// }




import React, { useState } from 'react';
import './addProduct.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddProduct() {
  const navigate = useNavigate();

  
// const SERVER_URL = 'https://get-your-book-server.onrender.com';
const SERVER_URL = 'http://localhost:3000'; // Local development URL

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: '',
    stock_quantity: '',
    min_stock_threshold: ''
  });

  const handleReturnHome = () => {
    navigate('/admin-home');
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${SERVER_URL}/add-product`, formData);
      alert('Product added successfully!');
      navigate('/admin-home');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <div className="add-product-container">
      <button className="home-button" onClick={handleReturnHome}>
        Return to Home
      </button>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <h2>Add Product</h2>

        <label htmlFor="name">Product Name</label>
        <input type="text" id="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="description">Description (optional)</label>
        <input type="text" id="description" value={formData.description} onChange={handleChange} />

        <label htmlFor="category">Category</label>
        <select id="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select a Category</option>
          <option value="1">Fiction</option>
          <option value="2">Non-Fiction</option>
          <option value="3">Children</option>
        </select>

        <label htmlFor="price">Price</label>
        <input type="number" id="price" min="0" value={formData.price} onChange={handleChange} required />

        <label htmlFor="image">Image URL</label>
        <input type="text" id="image" value={formData.image} onChange={handleChange} />

        <label htmlFor="stock_quantity">Initial Stock Quantity</label>
        <input type="number" id="stock_quantity" min="0" value={formData.stock_quantity} onChange={handleChange} required />

        <label htmlFor="min_stock_threshold">Minimum Stock Threshold</label>
        <input type="number" id="min_stock_threshold" min="1" max="99999" value={formData.min_stock_threshold} onChange={handleChange} required />

        <div className="add-product-buttons">
          <button type="submit" className="add-product-button">Confirm</button>
          <button type="reset" className="add-product-button cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
}
