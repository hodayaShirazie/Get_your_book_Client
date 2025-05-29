
# Get Your Book Client

The client side of the "Get Your Book" project is designed for user interaction, allowing customers to register accounts, search for books, manage their shopping cart, and make purchases. Users can also browse products, save items to a wishlist, and edit their account details. The website offers an intuitive shopping experience with features like viewing sales statistics and bestselling books


## Demo

Insert gif or link to demo


## Installation

To run the frontend server on your local machine, follow these steps:

1. Clone the repository:  
   `git clone https://github.com/hodayaShirazie/Get_your_book_Client.git`

2. Navigate to the project directory:  
   `cd Get_your_book_Client`

3. Install dependencies:
   `npm install` 

4. Start the server:  
   `npm start`
    
## Features Overview

### Admin Features
- Admin login with credentials stored in the database
- Add, update, and delete books
- View customer orders
- Change order status (processing, shipped, delivered)
- Add and manage delivery dates
- View sales and user statistics
- Receive alerts for low stock
- Edit admin profile

### User Features
- User registration and login
- Forgot password functionality (reset via email)
- Edit personal profile
- Browse books by category
- Search books by name
- Sort books by price (ascending/descending)
- Add books to shopping cart and complete purchase
- Add books to wishlist
- Rate and review books
- View order history
- Cancel orders (before shipment)
- Choose delivery date and method
- View monthly bestsellers



## Project Structure:
```plaintext
GET_YOUR_BOOK_CLIENT/
├── _mocks_/
│   └── fileMock.js
├── .circleci/
│   └── config.yml
├── dist/
├── docs/
│   └── Mockup.pdf/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── about/
│   │   ├── home/
│   │   ├── HomepageCustomer/
│   │   ├── HomepageManager/
│   │   ├── Login/
│   │   └── Register/
│   |   ├───BackToHomeButton
│   |   ├───updateProfile
│   |   ├───Catalog
│   |   ├───AddProduct
│   |   ├───DeleteProduct
│   |   ├───UpdateProduct
│   |   ├───BookDetails
│   |   ├───ShoppingCart
│   |   ├───PurchaseSummary
│   |   ├───CustomerOrders
│   |   ├───LowStockAlerts
│   |   ├───SetDeliveryDays
│   |   ├───StoreStatistics
│   |   ├───ViewOrdersAdmin
│   |   └───Wishlist
│   ├── App.jsx
│   ├── App.css
│   ├── config.js
│   ├── index.jsx
│   └── main.jsx
├── tests/
│   ├── addToShoppingCart.spec.js
│   ├───deleteProduct.spec.js
│   ├───login.spec.js
│   ├───SetDeliveryDays
│   └───updateProfile.spec.js
├── .babelrc
├── .env
├── .eslint.config.js
├── index.html
├── jest.setup.js
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
 ```



## Mockup

![Mockup](./docs/Mockup.pdf)


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


### Environment Variables

To run this project, you will need to add the following environment variable to your `.env` file: `VITE_SERVER_URL`


Set it according to your environment:

- For **local development**, use: http://localhost:3000 

- For **production**, use: https://get-your-book-server.onrender.com

## Contributing

Contributions are always welcome!

If you’d like to contribute, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a pull request

Please make sure your code follows the project's style guidelines and includes relevant tests or documentation updates if needed.

## Authors

- [@Hodaya Shirazie](https://github.com/hodayaShirazie)
- [@Tamar Mosheev](https://github.com/TamarMosheev)
- [@Tehila Partush](https://github.com/tehilaPa)
- [@Rina binushashvili](https://github.com/R-B-613)
- [@Merav Hashta](https://github.com/MeravBest)

![Logo](./docs/GYB_logo.png)
