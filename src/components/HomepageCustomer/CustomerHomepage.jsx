import React, { useEffect, useState } from 'react';
import './CustomerHomepage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { SERVER_URL } from '../../config'; 




const CustomerHomepage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

  // const SERVER_URL = 'https://get-your-book-server.onrender.com';
  // const SERVER_URL = 'http://localhost:3000'; 

  useEffect(() => {
    axios.get(`${SERVER_URL}/products`) 
      .then(response => {
        const data = response.data;
        const booksArray = Array.isArray(data) ? data : [data];
        setBooks(booksArray);
        console.log('books:', booksArray);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);



  const handleAddToCart = async (book) => {
    const username = localStorage.getItem('username'); 
  
    try {
      const response = await axios.post(`${SERVER_URL}/add-to-shopping-cart`, {
        username: username,       
        productId: book.id      
      });
  
      console.log('Added to cart:', book.name);
      console.log('Server response:', response.data);
  
      setCart(prevCart => [...prevCart, book]);
  
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  

  return (
    <div className="customer-bg">
      <div className="customer-main-card">
        <h2 className="customer-title">Best-Selling Books</h2>
        <div className="customer-top-books">
          <div>
            <img src="https://covers.openlibrary.org/b/id/11268242-L.jpg" alt="Book A" />
            <br />Book A
          </div>
          <div>
            <img src="https://covers.openlibrary.org/b/id/8234971-L.jpg" alt="Book B" />
            <br />Book B
          </div>
          <div>
            <img src="https://covers.openlibrary.org/b/id/8235475-L.jpg" alt="Book C" />
            <br />Book C
          </div>
        </div>

        <div className="customer-search-bar">
          <div className="search-container">
            <input type="text" placeholder="Search" />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div className="customer-nav-bar">
          <button onClick={() => navigate('/shopping-cart')}>Shopping Cart  </button>
          <button>My Orders</button>
          <button>My Wishlist</button>
          <select defaultValue="">
            <option disabled value="">Sort by Price</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
          <button onClick={() => navigate('/update-profile')} >Edit Personal Information</button>
          <select defaultValue="">
            <option disabled value="">Category</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="children">Children</option>
          </select>
        </div>

        <div className="customer-books-grid">
          {books.map((book, index) => (
            <div className="customer-book-card" key={index}>
              <img
                src={`data:image/jpeg;base64,${book.imageBase64}`}
                alt={book.name}
                className="book-image"
              />
              <div className="customer-book-title">{book.name}</div>
              <div className="customer-book-price">${book.price}</div>
              <div className="customer-book-info">
                <div className="customer-book-stars">★★★★☆</div>
                <div className="customer-book-icons">
                  <button title="Add to Cart" onClick={() => handleAddToCart(book)}>➕</button>
                  <button title="Add to Wishlist">♡</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="about-button" onClick={() => navigate('/about')}>About</button>
    </div>
  );
};

export default CustomerHomepage;

