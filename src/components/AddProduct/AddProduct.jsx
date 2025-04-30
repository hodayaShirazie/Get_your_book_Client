
import React from 'react';
import './AddProduct.css';


export default function AddProduct() {
  return (
    <div className="form-container">
      <h2>Add Product</h2>
      <form>
        <label htmlFor="productName">Product Name</label>
        <input type="text" id="productName" pattern="[A-Za-z0-9 ]+" required />

        <label htmlFor="description">Description (optional)</label>
        <input type="text" id="description" />

        <label htmlFor="category">Category</label>
        <select id="category" required>
          <option value="">Select a Category</option>
          <option value="quick">Quick Reads</option>
          <option value="epic">Epic Journeys</option>
          <option value="top">Top Picks</option>
          <option value="shared">Shared Stories</option>
        </select>

        <label htmlFor="price">Price</label>
        <input type="number" id="price" min="0" required />

        <label htmlFor="image">Image URL</label>
        <input type="text" id="image" />

        <label htmlFor="stock">Initial Stock Quantity</label>
        <input type="number" id="stock" min="0" required />

        <label htmlFor="threshold">Minimum Stock Threshold</label>
        <input type="number" id="threshold" min="1" max="99999" defaultValue="10" required />

        <div className="buttons">
          <button type="submit" className="confirm">Confirm</button>
          <button type="reset" className="cancel">Cancel</button>
        </div>
      </form>
    </div>
  );
}
