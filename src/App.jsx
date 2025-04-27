import React,{Fragment} from 'react';
import './App.css';
import Homepage from './components/homepage/homepage.jsx';
import LoginRegister from './components/authentication/loginRegister.jsx';
import About from './components/about/about.jsx';
import Home from './components/home/home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from "./components/Login/Login.jsx"
import PasswordRecovery from "./components/Login/PasswordRecovery.jsx"
import Register from "./components/Register/Register.jsx";

function App() {
  return (
    <Fragment>

      {/* <Homepage/> */}
      {/* <LoginRegister/> */}
      <Home />
      
      {/*<Register /> */}
      {/* <Router>
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/passwordrecovery" element={<PasswordRecovery/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </Router> */}
    </Fragment>
  );
}

export default App;
