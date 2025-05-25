import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import './Wishlist.css';
import { SERVER_URL } from '../../config';
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/wishlist/${username}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching wishlist', error);
      }
    };

    fetchWishlist();
  }, [username]);

  return (
    <div className="wishlist-container">
  <div className="wishlist-background-overlay"></div>
  <div className="wishlist-content">
    <h1>My Wishlist</h1>
    {products.map(product => (
      <Link
        to={`/book/${product.id}`}
        key={product.id}
        className="wishlist-link"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div className="wishlist-item">
          <img src={`data:image/jpeg;base64,${product.imageBase64}`} alt={product.name} className="wishlist-image" />
          <div className="wishlist-details">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
        </div>
      </Link>
    ))}
    <BackToHomeButton />
  </div>
</div>

  );
};

export default Wishlist;
