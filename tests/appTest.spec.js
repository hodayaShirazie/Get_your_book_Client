// App.test.jsx

import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'; // gives you .toBeInTheDocument() and other matcherss
import App from '../src/App';

describe('App component', () => {
  test('renders welcome text', () => {
    render(<App />);
    expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
  });

  test('increments count when button is clicked', async () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /count is 0/i });
    // Use userEvent to simulate a click
    await userEvent.click(button);
    // After one click, it should read "count is 1"
    expect(screen.getByText(/count is 1/i)).toBeInTheDocument();
  });
});