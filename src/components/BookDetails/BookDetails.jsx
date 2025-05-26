import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetails.css';
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';
import { SERVER_URL } from '../../config'; 


export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [outOfStock, setOutOfStock] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleAddToCart = async (book) => {
    const username = localStorage.getItem('username'); 
  
    try {
      const response = await axios.post(`${SERVER_URL}/add-to-shopping-cart`, {
        username: username,       
        productId: book.id      
      });
      if (response.data.message === 'Out of Stock') {
        setOutOfStock(true);
        setTimeout(() => setOutOfStock(false), 3000); 
        return;
      }
  
      setOutOfStock(false);
  
  
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  

const handleAddToWishlist = async (book) => {
  const username = localStorage.getItem('username');
  try {
    const response = await axios.post(`${SERVER_URL}/add-to-wishlist`, {
      username,
      productId: book.id
    });

    if (response.data.message === 'Already in Wishlist') {
      setErrorMessage('This book is already in your wishlist.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    if (response.data.message === 'Added to Wishlist') {
      setSuccessMessage('Added to wishlist!');
      setIsInWishlist(true);
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
      setIsInWishlist(false);
      setSuccessMessage('Removed from wishlist!');
      setTimeout(() => setSuccessMessage(''), 2000);
    }
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    setErrorMessage('Error removing from wishlist. Please try again.');
    setTimeout(() => setErrorMessage(''), 3000);
  }
};



  useEffect(() => {
    const fetchBookAndWishlist = async () => {
      try {
        const bookResponse = await axios.get(`${SERVER_URL}/products-all/${id}`);
        setBook(bookResponse.data);
  
        const username = localStorage.getItem('username');
        const wishlistResponse = await axios.get(`${SERVER_URL}/wishlist/${username}`);
        const wishlistBooks = wishlistResponse.data;
  
        const inWishlist = wishlistBooks.some(item => item.id === bookResponse.data.id);
        setIsInWishlist(inWishlist);
  
      } catch (error) {
        console.error('Error loading data:', error);
        setError(true);
      }
    };
  
    fetchBookAndWishlist();
  }, [id]);
  
  

  useEffect(() => {
    axios.get(`${SERVER_URL}/products-all/${id}`)
      .then((response) => setBook(response.data))
      .catch((err) => {
        console.error('Error loading book:', err);
        setError(true);
      });
  }, [id]);

  if (error) {
    return <div className="book-loading">Failed to load book.</div>;
  }

  if (!book) {
    return <div className="book-loading">Loading book details...</div>;
  }

  return (
    <div className="book-details-page">
      <div className="book-details-container">
        <h2 className="book-title">{book.name}</h2>
        <img
          src={book.image_url}
          alt={book.name}
          className="book-image"
        />

        <div className="book-details-text">
        {outOfStock && (
            <div className="out-of-stock-banner">
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
          <p><strong>ID:</strong> {book.id}</p>
          <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
          <p><strong>Price:</strong> ${book.price}</p>
          <p><strong>Rating:</strong> ★★★★☆</p>
          
          <div className="book-actions">
          <button title="Add to Cart" onClick={() => handleAddToCart(book)}>➕</button>


          <button
            title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            onClick={(e) => {
              e.stopPropagation();
              if (isInWishlist) {
                handleRemoveFromWishlist(book);
              } else {
                handleAddToWishlist(book);
              }
            }}
          >
            {isInWishlist ? '♥' : '♡'}
          </button>

          </div>

          <p className="rating-label"><strong>Your Rating:</strong></p>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= userRating ? 'star filled' : 'star'}
                onClick={() => setUserRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          
        </div>

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

      <BackToHomeButton />
    </div>
  );
}

