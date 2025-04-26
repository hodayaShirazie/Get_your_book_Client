import React,{Fragment} from 'react';
import './App.css';
import Homepage from './components/homepage/homepage.jsx';
import LoginRegister from './components/authentication/loginRegister.jsx';
import About from './components/about/about.jsx';
import Home from './components/home/home.jsx';

function App() {
  return (  
    <Fragment>

      {/* <Homepage/> */}
      {/* <LoginRegister/> */}
      <Home />
      
    </Fragment>   
  );
}

export default App;
