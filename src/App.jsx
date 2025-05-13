import { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login/Login.jsx"
import PasswordRecovery from "./components/Login/PasswordRecovery.jsx"
import About from "./components/about/about.jsx"
import Register from "./components/Register/Register.jsx"
import Home from "./components/home/home.jsx";
import CustomerHomepage from "./components/HomepageCustomer/CustomerHomepage.jsx";  
import ManagerHomePage from "./components/HomepageManager/ManagerHomePage.jsx";
import UpdateProfile from "./components/UpdateProfile/updateProfile.jsx";
import Catalog from "./components/Catalog/Catalog.jsx";
import AddProduct from "./components/AddProduct/AddProduct.jsx";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct.jsx";
import DeleteProduct from "./components/DeleteProduct/DeleteProduct.jsx";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart.jsx";
import PurchaseSummary from "./components/PurchaseSummary/PurchaseSummary.jsx";
import OrderConfirm from "./components/PurchaseSummary/OrderConfirm.jsx";
import BookDetails from "./components/BookDetails/BookDetails.jsx";
import SetDeliveryDays from "./components/SetDeliveryDays/SetDeliveryDays.jsx"; 
import ViewOrders from "./components/ViewOrdersAdmin/ViewOrders.jsx";
import StoreStatistics from "./components/StoreStatistics/StoreStatistics.jsx";
import CustomerOrders from "./components/CustomerOrders/CustomerOrders.jsx";


function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover-password" element={<PasswordRecovery />} />
          <Route path='/about' element={<About/>}/>
          <Route path="/customer-home" element={<CustomerHomepage />} />
          <Route path="/admin-home" element={<ManagerHomePage />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/admin-catalog" element={<Catalog />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update-product" element={<UpdateProduct />} />
          <Route path="/delete-product" element={<DeleteProduct />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/purchase-summary" element={<PurchaseSummary />} />
          <Route path="/order-confirm" element={<OrderConfirm />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/view-orders" element={<ViewOrders />} />
          <Route path="/store-statistics" element={<StoreStatistics />} />
          <Route path="/set-delivery-days" element={<SetDeliveryDays />} />
          <Route path="/view-orders" element={< ViewOrders/>} />
          <Route path="/customer-orders" element={<CustomerOrders />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
