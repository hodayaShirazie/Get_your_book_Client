import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetails.css';
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';
import { SERVER_URL } from '../../config'; 

const handleAddToCart = async (book) => {
  const username = localStorage.getItem('username'); 

  try {
    const response = await axios.post(`${SERVER_URL}/add-to-shopping-cart`, {
      username: username,       
      productId: book.id      
    });

    console.log('Added to cart:', book.name);
    console.log('Server response:', response.data);

  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(false);
  const [userRating, setUserRating] = useState(0);
  
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
          <p><strong>ID:</strong> {book.id}</p>
          <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
          <p><strong>Price:</strong> ${book.price}</p>
          <p><strong>Rating:</strong> ★★★★☆</p>
          
          <div className="book-actions">
          <button title="Add to Cart" onClick={() => handleAddToCart(book)}>➕</button>
            <button title="Add to Wishlist">♡</button>
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
      </div>

      <BackToHomeButton />
    </div>
  );
}
