import React from 'react';
import './Catalog.css';
import { useNavigate } from 'react-router-dom'; 


function CatalogPage() {
    
  const navigate = useNavigate(); 
  return (

    <div className="catalog-container">
      <div className="catalog-box">
        <h1 className="catalog-title">Catalog</h1>
        <button className="catalog-button" onClick={() => navigate('/add-product')}>Add Product</button>
        <button className="catalog-button">Update Product</button>
        <button className="catalog-button">Delete Product</button>
      </div>
      <button className="home-button">Return to Home</button>
    </div>
  );
}

export default CatalogPage;
