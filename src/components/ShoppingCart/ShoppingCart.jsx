import React, { useEffect, useState } from 'react';
import './ShoppingCart.css';
import { useNavigate } from 'react-router-dom';

import { SERVER_URL } from '../../config'; 
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';


export default function ShoppingCart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const username = localStorage.getItem('username');

    useEffect(() => {
        if (username) {
            fetch(`${SERVER_URL}/shopping-cart/${username}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.length > 0) {
                        setCartItems(data);
                        const total = data.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
                        setTotalPrice(total);
                    } else {
                        setCartItems([]);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching cart items:', error);
                });
        }
    }, [username]);

    const updateCart = (itemId, quantity) => {
        fetch(`${SERVER_URL}/shopping-cart/${username}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId, quantity }),
        })
            .then((response) => response.json())
            .then(() => {
                // After the update, fetch the updated cart
                fetch(`${SERVER_URL}/shopping-cart/${username}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setCartItems(data);
                        const total = data.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
                        setTotalPrice(total);
                    });
            })
            .catch((error) => {
                console.error('Error updating cart:', error);
            });
    };

    const handleDecrement = async (itemId, quantity) => {
        const username = localStorage.getItem('username');
        console.log('decrementing from cart:', itemId, 'for user:', username); 
    
        try {
            const response = await fetch(`${SERVER_URL}/remove-from-shopping-cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,       
                    productId: itemId      
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Product removed or quantity updated:', data.message);
    
                const updatedCart = cartItems.map(item => {
                    if (item.id === itemId) {
                        return { ...item, quantity: item.quantity - 1 }; 
                    }
                    return item;
                });
    
                setCartItems(updatedCart);
    
                const total = updatedCart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
                setTotalPrice(total);
            } else {
                console.error('Failed to remove from cart:', data.message);
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };


    const handleIncrement = async (itemId, quantity) => {
        const username = localStorage.getItem('username');
    
        try {
            const response = await fetch(`${SERVER_URL}/add-to-shopping-cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,       
                    productId: itemId      
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Product added or quantity updated:', data.message);
    
                const updatedCart = cartItems.map(item => {
                    if (item.id === itemId) {
                        return { ...item, quantity: item.quantity + 1 }; 
                    }
                    return item;
                });
    
                setCartItems(updatedCart);
    
                const total = updatedCart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
                setTotalPrice(total);
            } else {
                console.error('Failed to add to cart:', data.message);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
    
      

    

    return (
        <div className="shopping-bg">
            <div className="cart-container">
                <h2>Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your shopping cart is empty.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.filter(item => item.quantity > 0).map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>${Number(item.price).toFixed(2)}</td>
                                    <td>
                                        <div className="quantity-container">
                                            <button 
                                                className="quantity-btn" 
                                                onClick={() => handleDecrement(item.id, item.quantity)} 
                                                disabled={item.quantity <= 0}
                                            >
                                                -
                                            </button>
                                            <span className="quantity-text">{item.quantity}</span>
                                            <button 
                                                className="quantity-btn" 
                                                onClick={() => handleIncrement(item.id, item.quantity)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}           
                <p className="total-price">Total: ${totalPrice.toFixed(2)}</p>

                <button
                    className="purchase-button"
                    onClick={() => {
                        if (cartItems.length > 0) {
                        navigate('/purchase-summary');
                        } else {
                        navigate('/customer-home');
                        }
                    }}
                    >Continue to Purchase
                </button>
                <BackToHomeButton />
            </div>
            
        </div>
    );
}
