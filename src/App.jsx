import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login/Login.jsx"
import PasswordRecovery from "./components/Login/PasswordRecovery.jsx"
import About from "./components/about/about.jsx"
import Register from "./components/register/register.jsx";
import Home from "./components/home/home.jsx";
import CustomerHomepage from "./components/HomepageCustomer/CustomerHomepage.jsx";  
import ManagerHomePage from "./components/HomepageManager/ManagerHomePage.jsx";


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
        </Routes>

    </Router>
    </Fragment>
  );
}

export default App;
