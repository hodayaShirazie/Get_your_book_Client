
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeleteProduct from '../src/components/DeleteProduct/DeleteProduct';
import '@testing-library/jest-dom';
import axios from 'axios';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios'); 
jest.mock('../src/config', () => ({
  SERVER_URL: 'https://get-your-book-server.onrender.com'
}));
describe('DeleteProduct component', () => {
  beforeEach(() => {
    localStorage.setItem('role', 'admin');
    axios.get.mockResolvedValue({
      data: [
        { id: 1, name: 'Book A' },
        { id: 2, name: 'Book B' }
      ]
    });
  });

  test('renders product list and deletes item', async () => {
    axios.delete.mockResolvedValue({});

    render(<DeleteProduct />, { wrapper: MemoryRouter });

    expect(await screen.findByText(/book a/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/which product/i), {
      target: { value: '1' }
    });

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    await waitFor(() => screen.getByText(/are you sure/i));
    fireEvent.click(screen.getByText(/yes/i));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining('/delete-product/1'));
    });
  });
});
