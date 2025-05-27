import React, { useEffect, useState } from 'react';
import './CustomerHomepage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../config'; 


const CustomerHomepage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');  
  const [sortOrder, setSortOrder] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [outOfStockBookId, setOutOfStockBookId] = useState(null);
  const [topBooks, setTopBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});
  
  const [successMessage, setSuccessMessage] = useState('');


  



  const handleAddToCart = async (book) => {
    const username = localStorage.getItem('username'); 
    console.log("Sending to server:", book);
  
    try {
      const response = await axios.post(`${SERVER_URL}/add-to-shopping-cart`, {
        username: username,       
        productId: book.id      
      });
      if (response.data.message === 'Out of Stock') {
        setOutOfStockBookId(book.id);
        setTimeout(() => setOutOfStockBookId(null), 3000); 
        return;
      }
  
      console.log('Added to cart:', book.name);
      console.log('Server response:', response.data);
  
      setCart(prevCart => [...prevCart, book]);
  
    } catch (error) {
      console.error('Error adding to cart:', error);
      setErrorMessage('Error adding to cart. Please try again.');
      setOutOfStockBookId(book.id);
      setTimeout(() => setOutOfStockBookId(null), 3000);
    }
  };
  



  const handleAddToWishlist = async (book) => {
    const username = localStorage.getItem('username');
    try {
      const response = await axios.post(`${SERVER_URL}/add-to-wishlist`, {
        username: username,
        productId: book.id
      });
  
      if (response.data.message === 'Already in Wishlist') {
        setErrorMessage('This book is already in your wishlist.');
        setTimeout(() => setErrorMessage(''), 3000);
        return;
      }
  
      if (response.data.message === 'Added to Wishlist') {
        setSuccessMessage('Added to wishlist!');
        setTimeout(() => setSuccessMessage(''), 2000);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      setErrorMessage('Error adding to wishlist. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };


  
  

  const handleRemoveFromWishlist = async (book) => {
    const username = localStorage.getItem('username');
    try {
      const response = await axios.delete(`${SERVER_URL}/wishlist/${username}/${book.id}`);
      if (response.data.message === 'Product removed from wishlist') {
        setWishlist(prev => prev.filter(id => id !== book.id)); 
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      setErrorMessage('Error removing from wishlist. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };
  
 


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
    const fetchWishlist = async () => {
      const username = localStorage.getItem('username');
      try {
        const response = await axios.get(`${SERVER_URL}/wishlist/${username}`);
        const wishlistIds = response.data.map(book => book.id); 
        setWishlist(wishlistIds);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
  
    fetchWishlist();
  }, []);


  const toggleWishlist = async (book) => {
    const username = localStorage.getItem('username');
  
    if (wishlist.includes(book.id)) {
      await handleRemoveFromWishlist(book);
      setWishlist(prev => prev.filter(id => id !== book.id));
    } else {
      await handleAddToWishlist(book);
      setWishlist(prev => [...prev, book.id]);
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
  axios.get(`${SERVER_URL}/top-books`)
    .then(res => setTopBooks(res.data))
    .catch(err => console.error('Error fetching top books:', err));
}, []);

useEffect(() => {
  const fetchAverageRatings = async () => {
    const ratings = {};
    for (const book of books) {
      try {
        const res = await axios.get(`${SERVER_URL}/product-rating/average/${book.id}`);
        ratings[book.id] = res.data.average;
      } catch (error) {
        console.error(`Error fetching rating for book ${book.id}`, error);
      }
    }
    setAverageRatings(ratings);
  };

  if (books.length > 0) fetchAverageRatings();
}, [books]);


 

  const filteredBooks = selectedCategory
  ? books.filter(book => String(book.category_id) === selectedCategory)
  : [...books];

if (sortOrder === 'low-high') {
  filteredBooks.sort((a, b) => a.price - b.price);
} else if (sortOrder === 'high-low') {
  filteredBooks.sort((a, b) => b.price - a.price);
}



  return (
    <div className="customer-bg">
      <div className="customer-main-card">
        
        <h2 className="customer-title">Best-Selling Books</h2>
        {topBooks  && topBooks.length > 0 && (
  <div className="customer-top-books">
    {topBooks.slice(0, 3).map((book) => (
      <div key={book.id} className="top-seller-glow">
        {book.image && book.image.startsWith("data:image/") ? (
          <img src={book.image} alt={book.name} />
        ) : (
          <div>No Image Available</div>
        )}
        <br />
        {book.name}
      </div>
    ))}
  </div>
)}


        <div className="customer-nav-bar">
          <button onClick={() => navigate('/shopping-cart')}>Shopping Cart</button>
          <button onClick={() => navigate('/customer-orders')}>My Orders</button>
          <button onClick={() => navigate('/wishlist')}>My Wishlist</button>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option disabled value="">Sort by Price</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
          <button onClick={() => navigate('/update-profile')}>Edit Personal Information</button>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="1">Quick Reads</option>
            <option value="2">Epic Journeys</option>
            <option value="3">Top Picks</option>
            <option value="4">Shared Stories</option>
          </select>
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
            <svg
              className="search-icon"
              onClick={handleSearch}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              style={{ cursor: 'pointer' }}
            >
              <path
                fill="none"
                stroke="#666"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
              />
            </svg>
          </div>
        </div>

      

        <div className="customer-books-grid">
          {filteredBooks.map((book, index) => (
            <div
              className="customer-book-card"
              key={index}
              onClick={() => navigate(`/book/${book.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="book-image-wrapper">
                <img
                  src={`data:image/jpeg;base64,${book.imageBase64}`}
                  alt={book.name}
                  className="book-image"
                />
                {outOfStockBookId === book.id && (


                <div className="out-of-stock-overlay">
                    <svg
                      className="out-of-stock-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 18c-1.104 0-1.99.896-1.99 2s.886 2 1.99 2c1.104 0 2-.896 2-2s-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2c1.104 0 1.99-.896 1.99-2s-.886-2-1.99-2zm1.107-2.76l1.6-8h-15.707l-.561-3h-3.439v2h2.061l2.529 13h13.777v-2h-12.248l-.312-1.6h11.3zm-1.107-8.24l-1.236 6h-9.94l-1.236-6h12.412z" />
                    </svg>
                    <span>OUT OF STOCK</span>
                  </div>
                )}

              </div>
              <div className="customer-book-title">{book.name}</div>
              <div className="customer-book-price">${book.price}</div>
              <div className="customer-book-info">
<div className="customer-book-stars">
  {averageRatings[book.id]
    ? '★'.repeat(Math.round(averageRatings[book.id])) +
      '☆'.repeat(5 - Math.round(averageRatings[book.id]))
    : '☆☆☆☆☆'}
</div>
                <div className="customer-book-icons">
                  
                    
                    <button
                    title="Add to Cart"

                    onClick={(e) => {
                
                    e.stopPropagation();
                    handleAddToCart(book);
                    }}
                  >
                    ➕
                  </button>




                  {/* <svg 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(book);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={wishlist.includes(book.id) ? "red" : "none"}
                    stroke="red"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ cursor: 'pointer' }}
                  >
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
                  </svg> */}

                  <div className="wishlist-icon" onClick={(e) => {
                    e.stopPropagation(); 
                    toggleWishlist(book);
                  }}>
                    {wishlist.includes(book.id) ? '♥' : '♡'}
                  </div>
                
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    
    
    
    
      <button className="about-button" onClick={() => navigate('/about')}>
        About
      </button>
  
      <div>
        {successMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              backgroundColor: '#4caf50', 
              color: 'white',
              padding: '8px 12px',
              borderRadius: '5px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              fontSize: '14px',
              opacity: 0.9,
              zIndex: 1000,
              transition: 'opacity 0.3s ease',
            }}
          >
            {successMessage}
          </div>
        )}
  
        {errorMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              backgroundColor: '#f44336', 
              color: 'white',
              padding: '8px 12px',
              borderRadius: '5px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              fontSize: '14px',
              opacity: 0.9,
              zIndex: 1000,
              transition: 'opacity 0.3s ease',
            }}
          >
            {errorMessage}
          </div>
        )}
      </div>
    
    </div>
  );
};

export default CustomerHomepage;
