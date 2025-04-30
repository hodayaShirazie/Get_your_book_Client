import React from 'react';
import './CustomerHomepage.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate


const books = [
  { title: 'Book D', price: '$9.99', stars: '★★★★☆', img: 'https://covers.openlibrary.org/b/id/11268347-L.jpg' },
  { title: 'Book E', price: '$11.99', stars: '★★★★★', img: 'https://covers.openlibrary.org/b/id/11268242-L.jpg' },
  { title: 'Book F', price: '$13.50', stars: '★★★☆☆', img: 'https://covers.openlibrary.org/b/id/11269123-L.jpg' },
  { title: 'Book G', price: '$10.90', stars: '★★★★☆', img: 'https://covers.openlibrary.org/b/id/8234971-L.jpg' },
  { title: 'Book H', price: '$12.00', stars: '★★★★★', img: 'https://covers.openlibrary.org/b/id/11269177-L.jpg' },
  { title: 'Book I', price: '$8.75', stars: '★★★☆☆', img: 'https://covers.openlibrary.org/b/id/8235475-L.jpg' }
];

const CustomerHomepage = () => {

  const navigate = useNavigate();  

  const navigateToAbout = () => {
    navigate('/about');  
  };

  const navigateToUpdateProfile = () => {
    navigate('/update-profile');  
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
          <button>Shopping Cart</button>
          <button>My Orders</button>
          <button>My Wishlist</button>
          <select defaultValue="">
            <option disabled value="">Sort by Price</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
          <button onClick={navigateToUpdateProfile}>Edit Personal Information</button>
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
              <img src={book.img} alt={book.title} />
              <div className="customer-book-title">{book.title}</div>
              <div className="customer-book-price">{book.price}</div>
              <div className="customer-book-info">
                <div className="customer-book-stars">{book.stars}</div>
                <div className="customer-book-icons">
                  <button title="Add to Cart">➕</button>
                  <button title="Add to Wishlist">♡</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Button */}
      <button className="about-button" onClick={navigateToAbout}>About</button>

    </div>
  );
};

export default CustomerHomepage;
