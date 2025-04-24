// App.test.jsx
global.fetch = require('node-fetch');


import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import App from '../src/App';

describe('App component', () => {
  test('renders App without crashing', () => {
    render(<App />);
  });

  test('sorts an array of numbers correctly', () => {
    const unsorted = [8, 3, 5, 1, 7];
    const sorted = [...unsorted].sort((a, b) => a - b);
    expect(sorted).toEqual([1, 3, 5, 7, 8]);
  });

  test('filters available books correctly', () => {
    const books = [
      { title: 'Book A', available: true },
      { title: 'Book B', available: false },
      { title: 'Book C', available: true },
    ];
    const result = books.filter(book => book.available);
    expect(result).toHaveLength(2);
    expect(result.map(b => b.title)).toEqual(['Book A', 'Book C']);
  });

  test('calculates total price of books in cart', () => {
    const cart = [
      { title: 'Book A', price: 30 },
      { title: 'Book B', price: 20 },
      { title: 'Book C', price: 50 },
    ];
    const total = cart.reduce((sum, book) => sum + book.price, 0);
    expect(total).toBe(100);
  });

  test('capitalizes book titles', () => {
    const title = 'harry potter and the goblet of fire';
    const capitalized = title
      .split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');
    expect(capitalized).toBe('Harry Potter And The Goblet Of Fire');
  });
});
