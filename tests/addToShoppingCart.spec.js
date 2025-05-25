import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ShoppingCart from '../src/components/ShoppingCart/ShoppingCart';
import CustomerHomepage from '../src/components/HomepageCustomer/CustomerHomepage';
import '@testing-library/jest-dom';
import axios from 'axios';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';


const mockProduct = {
  id: 25,
  name: 'Harry Potter and the Half-Blood Prince',
  price: 32.00,
  imageBase64: 'mockImageData'
};

jest.mock('axios');
axios.get.mockResolvedValue({ data: [mockProduct] });
axios.post.mockResolvedValue({ data: { success: true } });

jest.mock('../src/config', () => ({
  SERVER_URL: 'http://localhost:3000',
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

global.fetch = jest.fn((url) => {
  if (url.includes('update')) {
    return Promise.resolve({
      json: () => Promise.resolve({ success: true }),
      ok: true
    });
  }
  return Promise.resolve({
    json: () => Promise.resolve([mockProduct]),
    ok: true
  });
});

describe('Shopping Cart Integration Tests', () => {
  beforeEach(() => {
    localStorage.setItem('username', 'testUser');
    mockedNavigate.mockClear();
    jest.clearAllMocks();
    
    global.fetch.mockClear();
    axios.get.mockClear();
    axios.post.mockClear();
  });

  test('renders empty cart message when no products', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([]),
      ok: true
    });

    await act(async () => {
      render(<ShoppingCart />, { wrapper: MemoryRouter });
    });

    await waitFor(() => {
      expect(screen.getByText('Your shopping cart is empty.')).toBeInTheDocument();
    });
  });

test('adds product to cart and displays it in shopping cart', async () => {
  axios.get.mockResolvedValueOnce({
    data: [mockProduct]
  });

  axios.post.mockResolvedValueOnce({
    data: { success: true }
  });

  await act(async () => {
    render(<CustomerHomepage />, { wrapper: MemoryRouter });
  });

  // await waitFor(() => {
  //   expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  // });

  await act(async () => {
    fireEvent.click(screen.getAllByText('➕')[0]);
  });

  expect(axios.post).toHaveBeenCalledWith(
    'http://localhost:3000/add-to-shopping-cart',
    {
      username: 'testUser',
      productId: mockProduct.id
    }
  );

  await act(async () => {
    render(
      <BrowserRouter>
        <ShoppingCart />
      </BrowserRouter>
    );
  });

 
});

});