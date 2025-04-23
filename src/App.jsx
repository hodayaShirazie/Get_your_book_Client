import React,{Fragment} from 'react';
import './App.css';
import Homepage from './components/homepage/homepage.jsx';
import LoginRegister from './components/authentication/loginRegister.jsx';

function App() {
  return (  
    <Fragment>

      {/* <Homepage/> */}
      <LoginRegister/>
      

    </Fragment>   
  );
}

export default App;
