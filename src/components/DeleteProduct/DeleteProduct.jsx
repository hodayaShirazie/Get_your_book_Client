import React, { useEffect, useState } from 'react';
import "../AddProduct/AddProduct.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';

import { SERVER_URL } from '../../config'; 


export default function DeleteProduct() {
  
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${SERVER_URL}/products`);
        setProductList(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const handleReturnHome = () => {
    navigate('/admin-home');
  };


  const handleProductChange = (e) => {
    setSelectedProductId(e.target.value);
  };

  const handleDelete = () => {
    if (!selectedProductId) {
      setErrorMessage('Please select a product to delete.');
      setShowError(true);
      return;
    }
  
    setShowModal(true); // open confirm modal
  };
  const confirmDeletion = async () => {
    try {
      await axios.delete(`${SERVER_URL}/delete-product/${selectedProductId}`);
      setShowSuccess(true); // מודאל הצלחה
      setProductList(prev => prev.filter(p => p.id !== selectedProductId));
    } catch (error) {
      console.error("Error deleting product:", error);
      setErrorMessage("Failed to delete product.");
      setShowError(true); // מודאל שגיאה
    } finally {
      setShowModal(false);
    }
  };



  return (
    <div className="add-product-container">

      <form className="add-product-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Delete Product</h2>

        <label htmlFor="product">Which Product Do You Want to Delete?</label>
        <select id="product" value={selectedProductId} onChange={handleProductChange} required>
          <option value="">Select a Product</option>
          {productList.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (ID: {product.id})
            </option>
          ))}
        </select>

        <div className="add-product-buttons">
          <button
            type="button"
            className="add-product-button"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            type="button"
            className="add-product-button cancel-button"
            onClick={handleReturnHome}
          >
            Cancel
          </button>
        </div>
      </form>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Are you sure you want to delete this product?</p>
            <div className="modal-buttons">
              <button className="confirm-button" onClick={confirmDeletion}>Yes</button>
              <button className="modal-cancel-button" onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Product deleted successfully!</p>
            <button className="modal-cancel-button" onClick={() => setShowSuccess(false)}>Close</button>
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
