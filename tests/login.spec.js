import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../src/components/Login/Login';
import '@testing-library/jest-dom';
import axios from 'axios';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';



jest.mock('axios');
jest.mock('../src/config', () => ({
  SERVER_URL: 'http://localhost:3000',
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    mockedNavigate.mockReset();
  });

  test('redirects admin to /admin-home', async () => {
    axios.post.mockResolvedValue({
      data: { success: true, role: 'admin', username: 'adminUser' },
    });

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'adminUser', name: 'username' }
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'adminPass', name: 'password' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/admin-home');
    });
  });

  test('redirects customer to /customer-home', async () => {
    axios.post.mockResolvedValue({
      data: { success: true, role: 'customer', username: 'custUser' },
    });

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'custUser', name: 'username' }
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'custPass', name: 'password' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/customer-home');
    });
  });

  test('shows error on login failure', async () => {
    axios.post.mockResolvedValue({ data: { success: false } });

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'wrong', name: 'username' }
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'wrong', name: 'password' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });
  });
});
