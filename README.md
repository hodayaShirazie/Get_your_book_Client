## Client:

The client side of the "Get Your Book" project is designed for user interaction, allowing customers to register accounts, search for books, manage their shopping cart, and make purchases. Users can also browse products, save items to a wishlist, and edit their account details. The website offers an intuitive shopping experience with features like viewing sales statistics and bestselling books.


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

 
## Setup and Usage  
To run the frontend server on your local machine, follow these steps:

1. Clone the repository:  
   `git clone https://github.com/hodayaShirazie/Get_your_book_Client.git`

2. Navigate to the project directory:  
   `cd Get_your_book_Client`

3. Install dependencies:
   `npm install` 

4. Start the server:  
   `npm start`
