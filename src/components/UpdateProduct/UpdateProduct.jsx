import React, { useState, useEffect } from 'react';
import "../AddProduct/AddProduct.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';

import { SERVER_URL } from '../../config'; 


export default function UpdateProduct() {
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock_quantity: '',
    min_stock_threshold: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [productList, setProductList] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [noChangeMessage, setNoChangeMessage] = useState(false);
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${SERVER_URL}/products`);
        setProductList(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  const handleReturnHome = () => {
    navigate('/admin-home');
  };

  const handleProductChange = async (e) => {
    const productId = e.target.value;
    setSelectedProductId(productId);

    if (productId) {
      try {
        const response = await axios.get(`${SERVER_URL}/products-all/${productId}`);
        const product = response.data;

        setFormData({
          name: product.name || '',
          description: product.description || '',
          category: product.category_id || '',
          price: product.price || '',
          stock_quantity: product.stock_quantity || '',
          min_stock_threshold: product.min_stock_threshold || ''
        });

        setExistingImageUrl(product.image_url || ''); 

      } catch (error) {
        console.error('Error fetching selected product:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
  
    if (imageFile) {
      data.append('image', imageFile);
    }
  
    try {
      const response = await axios.put(`${SERVER_URL}/update-product/${selectedProductId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  
      const serverMessage = response.data.message;
  
      if (serverMessage === 'No changes detected, nothing was updated.') {
        setNoChangeMessage(true);
    } else {
      setShowSuccess(true);
    }
  
    } catch (error) {
      console.error('Error updating product:', error);
      setErrorMessage('Failed to update product.');
      setShowError(true);    }
  };
  

  return (
    <div className="add-product-container">
      

      <form className="add-product-form" onSubmit={handleSubmit}>
        <h2>Update Product</h2>

        <label htmlFor="product">Which Product Do You Want to Update?</label>
        <select id="product" value={selectedProductId} onChange={handleProductChange} required>
          <option value="">Select a Product</option>
          {productList.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (ID: {product.id})
            </option>
          ))}
        </select>

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
            <option value="3">Shared Stories</option>
        </select>

        <label htmlFor="price">Price</label>
        <input type="number" id="price" min="0" value={formData.price} onChange={handleChange} required />

        <label htmlFor="image">Product Image</label>
        <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
        
        {!imageFile && existingImageUrl && (
          <div className="current-image-preview">
            <p>Current Image:</p>
            <img src={existingImageUrl} alt="Current" width="150" />
          </div>
        )}

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
            <p>Product updated successfully!</p>
            <button
              className="modal-cancel-button"
              onClick={() => {
                setShowSuccess(false);
                navigate('/admin-home');
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {noChangeMessage && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>No changes detected. Nothing was updated.</p>
            <button className="modal-cancel-button" onClick={() => setNoChangeMessage(false)}>OK</button>
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
