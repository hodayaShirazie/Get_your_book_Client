import React, { useEffect, useState } from 'react';
import "../AddProduct/AddProduct.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DeleteProduct() {
  const SERVER_URL = 'https://get-your-book-server.onrender.com';
  // const SERVER_URL = 'http://localhost:3000'; // Local development URL
  
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');

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

  const handleDelete = async () => {
    if (!selectedProductId) {
      alert('Please select a product to delete.');
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    const deleteUrl = `${SERVER_URL}/delete-product/${selectedProductId}`;
    console.log("Deleting product with URL:", deleteUrl);  // הדפס את ה-URL שמישלח


    try {
      await axios.delete(`${SERVER_URL}/delete-product/${selectedProductId}`);

      alert("Product deleted successfully!");
      navigate('/admin-home');
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="add-product-container">
      <button className="home-button" onClick={handleReturnHome}>
        Return to Home
      </button>

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
    </div>
  );
}
