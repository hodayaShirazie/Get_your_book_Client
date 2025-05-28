import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UpdateProfile from '../src/components/updateProfile/updateProfile';
import '@testing-library/jest-dom';
import axios from 'axios';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';


jest.mock('axios');
jest.mock('../src/config', () => ({
  SERVER_URL: 'http://localhost:3000',
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Update Profile Component', () => {
  beforeEach(() => {
    mockedNavigate.mockReset();
  });

  test('redirects admin to /update-profile', async () => {
    axios.post.mockResolvedValue({
      data: { success: true, role: 'admin', username: 'adminUser' },
    });

    await act(async () => {
      render(<UpdateProfile  />, { wrapper: MemoryRouter })
    });
  });


test('displays current user data when loaded', async () => {
  const mockUser = {
    username: 'currentUser123',
    password: 'oldPassword!123'
  };

  axios.get.mockResolvedValue({
    data: { 
      success: true, 
      user: mockUser 
    }
  });

  render(<UpdateProfile />, { wrapper: MemoryRouter });
  await waitFor(() => {
    expect(screen.getByDisplayValue(mockUser.username)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter new password/i)).toBeInTheDocument();
  });
});

test('shows error when password is too short (full flow)', async () => {
  window.localStorage.setItem('role', 'customer');
  axios.get.mockResolvedValue({
    data: { success: true, user: { username: 'testuser', password: '' } }
  });

  render(<UpdateProfile />, { wrapper: MemoryRouter });

  fireEvent.change(screen.getByPlaceholderText(/enter new username/i), {
    target: { value: 'newuser', name: 'username' }
  });
  fireEvent.change(screen.getByPlaceholderText(/enter new password/i), {
    target: { value: 'short', name: 'password' }
  });

  fireEvent.click(screen.getByRole('button', { name: /update/i }));

  expect(await screen.findByText(/password must be at least 8 characters long/i)).toBeInTheDocument();
});

test('validates admin password requirements (min 8 chars + special char + number)', async () => {
  window.localStorage.setItem('role', 'admin');
  axios.get.mockResolvedValue({
    data: { success: true, user: { username: 'adminuser', password: '' } }
  });

  render(<UpdateProfile />, { wrapper: MemoryRouter });

  fireEvent.change(screen.getByPlaceholderText(/enter new username/i), {
    target: { value: 'adminuser', name: 'username' }
  });
  
    fireEvent.change(screen.getByPlaceholderText(/enter new password/i), {
    target: { value: 'Adminpass1', name: 'password' }
  });
  fireEvent.click(screen.getByRole('button', { name: /update/i }));
  expect(await screen.findByText(/password must contain at least one special character/i)).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText(/enter new password/i), {
    target: { value: 'Adminpass!', name: 'password' }
  });
  fireEvent.click(screen.getByRole('button', { name: /update/i }));
  expect(await screen.findByText(/manager password must contain at least one number/i)).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText(/enter new password/i), {
    target: { value: 'Adminpass1!', name: 'password' }
  });
  axios.post.mockResolvedValue({ data: { success: true } });
  fireEvent.click(screen.getByRole('button', { name: /update/i }));
  await waitFor(() => {
    expect(screen.queryByText(/password must contain/i)).toBeNull();
  });
});

test('validates admin username length (min 8 chars)', async () => {
  window.localStorage.setItem('role', 'admin');
  axios.get.mockResolvedValue({
    data: { success: true, user: { username: 'adminuser', password: '' } }
  });

  render(<UpdateProfile />, { wrapper: MemoryRouter });

  fireEvent.change(screen.getByPlaceholderText(/enter new username/i), {
    target: { value: 'admin', name: 'username' }
  });

  fireEvent.change(screen.getByPlaceholderText(/enter new password/i), {
    target: { value: 'ValidPass1!', name: 'password' }
  });

  await act(async () => {
  fireEvent.click(screen.getByRole('button', { name: /update/i }))});

  expect(await screen.findByText('Username must be at least 8 characters long')).toBeInTheDocument();
});


test('toggles password visibility on eye icon click', async () => {
  axios.get.mockResolvedValue({
    data: { success: true, user: { username: 'testuser', password: '' } }
  });

  await act(async () => {
    render(<UpdateProfile />, { wrapper: MemoryRouter });
  });

  const passwordInput = screen.getByPlaceholderText(/enter new password/i);
  
  const passwordContainer = passwordInput.parentElement;
  const toggleButton = passwordContainer.querySelector('span, button, svg');

  expect(passwordInput).toHaveAttribute('type', 'password');

  await act(async () => {
    fireEvent.click(toggleButton);
  });
  expect(passwordInput).toHaveAttribute('type', 'text');

  await act(async () => {
    fireEvent.click(toggleButton);
  });
  expect(passwordInput).toHaveAttribute('type', 'password');
});
});
