import React from 'react';
import './Catalog.css';
import { useNavigate } from 'react-router-dom'; 
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';

function CatalogPage() {
    
  const navigate = useNavigate(); 
  return (

    <div className="catalog-container">
      <div className="catalog-box">
        <h1 className="catalog-title">Catalog</h1>
        <button className="catalog-button" onClick={() => navigate('/add-product')}>Add Product</button>
        <button className="catalog-button" onClick={() => navigate('/update-product')}>Update Product</button>
        <button className="catalog-button" onClick={() => navigate('/delete-product')}>Delete Product</button>
      </div>
      <BackToHomeButton />
    </div>
  );
}

export default CatalogPage;
