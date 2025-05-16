// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import DeleteProduct from '../src/components/DeleteProduct/DeleteProduct';
// import '@testing-library/jest-dom';
// import axios from 'axios';

// import React from 'react';
// import { MemoryRouter } from 'react-router-dom';


// jest.mock('axios'); 
// jest.mock('../src/config', () => ({
//   SERVER_URL: 'http://localhost:3000',
// }));


// describe('DeleteProduct Component', () => {
//   beforeEach(() => {
//     // Simulate an admin role in localStorage
//     localStorage.setItem('role', 'admin');

//     // Mock the product list response from the server
//     axios.get.mockResolvedValue({
//       data: [
//         { id: 1, name: 'Book A' },
//         { id: 2, name: 'Book B' }
//       ]
//     });
//   });

//   test('shows products and deletes selected item', async () => {
//     // Mock the delete request
//     axios.delete.mockResolvedValue({});

//     // Render the component within a router context
//     render(<DeleteProduct />, { wrapper: MemoryRouter });

//     // Wait for the product list to load
//     await waitFor(() => screen.getByText(/book a/i));

//     // Select a product to delete
//     fireEvent.change(screen.getByLabelText(/which product/i), {
//       target: { value: '1' }
//     });

//     // Click the "Delete" button
//     fireEvent.click(screen.getByRole('button', { name: /delete/i }));

//     // Wait for the confirmation modal to appear
//     await waitFor(() => screen.getByText(/are you sure/i));

//     // Confirm the deletion
//     fireEvent.click(screen.getByText(/yes/i));

//     // Ensure the delete request was sent with the correct product ID
//     await waitFor(() => {
//       expect(axios.delete).toHaveBeenCalledWith(
//         expect.stringContaining('/delete-product/1')
//       );
//     });
//   });
// });
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

    // בדיקה שהמוצרים נטענו
    expect(await screen.findByText(/book a/i)).toBeInTheDocument();

    // בחירת מוצר למחיקה
    fireEvent.change(screen.getByLabelText(/which product/i), {
      target: { value: '1' }
    });

    // לחיצה על מחיקה
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    // לחיצה על אישור
    await waitFor(() => screen.getByText(/are you sure/i));
    fireEvent.click(screen.getByText(/yes/i));

    // בדיקה שהבקשה נשלחה
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining('/delete-product/1'));
    });
  });
});
