import React,{Fragment} from 'react';
import './App.css';
import Homepage from './components/homepage/homepage.jsx';
import LoginRegister from './components/authentication/loginRegister.jsx';
import About from './components/about/about.jsx';

function App() {
  return (  
    <Fragment>

      {/* <Homepage/> */}
      {/* <LoginRegister/> */}
      <About/>
      

    </Fragment>   
  );
}

export default App;
