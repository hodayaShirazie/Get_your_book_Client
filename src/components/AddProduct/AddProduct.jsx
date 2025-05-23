import React, { useState } from 'react';
import './AddProduct.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';

import { SERVER_URL } from '../../config'; 


export default function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock_quantity: '',
    min_stock_threshold: '10'
  });

  const [imageFile, setImageFile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleReturnHome = () => {
    navigate('/admin-home');
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append('image', imageFile);
    try {
      await axios.post(`${SERVER_URL}/add-product`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setShowSuccess(true); 
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Failed to add product.');
      setShowError(true); 
    }
   
  };

  return (
    <div className="add-product-container">

      <form className="add-product-form" onSubmit={handleSubmit}>
        <h2>Add Product</h2>

        <label htmlFor="name">Product Name</label>
        <input type="text" id="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="description">Description (optional)</label>
        <input type="text" id="description" value={formData.description} onChange={handleChange} />

        <label htmlFor="category">Category</label>
        <select id="category" value={formData.category} onChange={handleChange} required>
          <option value="">select category</option>
            <option value="1">Quick Reads</option>
            <option value="2">Epic Journeys</option>
            <option value="3">Top Picks</option>
            <option value="4">Shared Stories</option>
        </select>

        <label htmlFor="price">Price</label>
        <input type="number" id="price" min="0" value={formData.price} onChange={handleChange} required />

        <label htmlFor="image">Product Image</label>
        <input type="file" id="image" accept="image/*" onChange={handleImageChange} required />

        <label htmlFor="stock_quantity">Initial Stock Quantity</label>
        <input type="number" id="stock_quantity" min="0" value={formData.stock_quantity} onChange={handleChange} required />

        <label htmlFor="min_stock_threshold">Minimum Stock Threshold</label>
        <input type="number" id="min_stock_threshold" min="1" max="99999" value={formData.min_stock_threshold} onChange={handleChange} required />

        <div className="add-product-buttons">
          <button type="submit" className="add-product-button">Confirm</button>
          <button type="reset" className="add-product-button cancel-button">Cancel</button>
        </div>
      </form>
      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Product added successfully!</p>
            <button className="modal-cancel-button" onClick={() => {
              setShowSuccess(false);
              navigate('/admin-home');
            }}>
              OK
            </button>
          </div>
        </div>
      )}

      {showError && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>{errorMessage}</p>
            <button className="modal-cancel-button" onClick={() => setShowError(false)}>Close</button>
          </div>
        </div>
      )}

      <BackToHomeButton />
    </div>
  );
}
