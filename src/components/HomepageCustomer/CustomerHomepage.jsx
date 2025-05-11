import React, { useEffect, useState } from 'react';
import './CustomerHomepage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../config'; 

const handleAddToCart = async (book, setCart) => {
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

const CustomerHomepage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');  

  const handleSearch = async (e) => {
    console.log("called handleSearch");
    e.preventDefault();
  
    try {
      if (searchTerm.trim() === '') {
        const response = await axios.get(`${SERVER_URL}/products`);
        const booksArray = Array.isArray(response.data) ? response.data : [response.data];
        setBooks(booksArray);
      } else {
        const response = await axios.get(`${SERVER_URL}/search-books`, {
          params: { q: searchTerm.trim() }
        });
        const booksArray = Array.isArray(response.data) ? response.data : [response.data];
        setBooks(booksArray);
      }
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };


  useEffect(() => {
    if (searchTerm.trim() === '') {
      axios.get(`${SERVER_URL}/products`)
        .then(response => {
          const booksArray = Array.isArray(response.data) ? response.data : [response.data];
          setBooks(booksArray);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }
  }, [searchTerm]);
  
  

  useEffect(() => {
    axios.get(`${SERVER_URL}/products`) 
      .then(response => {
        const data = response.data;
        const booksArray = Array.isArray(data) ? data : [data];
        setBooks(booksArray);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const filteredBooks = selectedCategory
    ? books.filter(book => String(book.category_id) === selectedCategory)
    : books;

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
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch(e); 
              }}
            />
            <span
              className="search-icon"
              onClick={() => handleSearch()}
              style={{ cursor: 'pointer' }}
            >
              🔍
            </span>
          </div>
        </div>

        <div className="customer-nav-bar">
          <button onClick={() => navigate('/shopping-cart')}>Shopping Cart  </button>
          <button onClick={() => navigate('/customer-orders')}>My Orders</button>
          <button>My Wishlist</button>
          <select defaultValue="">
            <option disabled value="">Sort by Price</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
          <button onClick={() => navigate('/update-profile')} >Edit Personal Information</button>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="1">Fiction</option>
            <option value="2">Non-Fiction</option>
            <option value="3">Children</option>
          </select>
        </div>

        <div className="customer-books-grid">
          {filteredBooks.map((book, index) => (
            <div
              className="customer-book-card"
              key={index}
              onClick={() => navigate(`/book/${book.id}`)}
              style={{ cursor: 'pointer' }}
            >
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
                  <button 
                    title="Add to Cart" 
                    onClick={(e) => {
                      e.stopPropagation(); //// Prevents navigation to the book page
                      handleAddToCart(book, setCart)}}>➕</button>
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
