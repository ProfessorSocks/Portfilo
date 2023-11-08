import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Gallery from './components/Gallery';
import ProjectsList from './components/ProjectsList';
import NavbarMain from './components/NavbarMain';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);

  function loggedInFunction (username,password){
    if(username == 'Camille' && password === 'Cat12'){
      setLoggedIn(true);
    }else if (username != 'Camille' || password != 'Cat12'){
      return(
        <alert>Incorrect Log in info</alert>
      )
    }else {
      console.log('error')
    }
  }

  return (
    <div>
      <NavbarMain/>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Gallery' element={<Gallery/>}/>
        <Route path='/Projects' element={<ProjectsList/>} />
        <Route path='/Login' element={<Login loggedIn={loggedInFunction}/>}/>
      </Routes>
    </div>
  );
}

export default App;
