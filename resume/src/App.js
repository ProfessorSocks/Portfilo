import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Gallery from './components/Gallery';
import ProjectsList from './components/ProjectsList';
import NavbarMain from './components/NavbarMain';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import ProjectSubPage from './components/ProjectSubPage';

function App() {

  const USERS_END = 'https://654c00f177200d6ba8587034.mockapi.io/Users'
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const[selectedProject, setSelectedProject] = useState(0)

  
  // this is called from login.js
  function updateUsername(username) {
    setUsername(username);
  }
  //this is called from login.js
  function updatePassword(password){
    setPassword(password);
  }

  //this function is passed down through props to login.js
  //it is passed in routes
  // function loggedInFunction (){
  //   if(username == 'Camille' && password === 'Cat12'){
  //     setLoggedIn(true);
  //     console.log(`logged in`);
  //   }else if (username != 'Camille' || password != 'Cat12'){
  //     return(
  //       <alert>Incorrect Log in info</alert>
  //     )
  //   }else {
  //     console.log('error')
  //   }
  // }
  const [USER_INFO,setUSER_INFO] = useState([]);



///////////// Login and logout functions
  const loggedInFunction = async () => {
    try{
      const resp = await fetch(`${USERS_END}?username=${username}`);
      const USER_INFO = await resp.json();
      if(resp.ok){
        setUSER_INFO(USER_INFO);
        console.log(USER_INFO[0].username);
        if(USER_INFO[0].password === password){
          setLoggedIn(true)
          setCookie(username, USER_INFO[0].id, 1);
        }
      }
      getCookie()//this resets the userinfo back to being called by id instead of username so you don't have to use[]
    }catch (e){
      console.log(`loggedInFunction had an error: ${e}`);
    }
    
  }

  function logoutFunction(){
    deleteCookies(USER_INFO.username, USER_INFO.id);
    setUSER_INFO([]);
    setUsername('');
    setLoggedIn(false)

  }


///////////// Get Users

  const[USERS, setUSERS] = useState([])

  const getUsers = async () => {
    try{
        const resp = await fetch(USERS_END);
        const USERS = await resp.json();
        return setUSERS(USERS);
    }catch(e){
        console.log(`getUSERS had an error ${e}`);
    }
  }
  useEffect(()=>{
    getUsers();
    getCookie();

  }, [])

//////////////////NEW ACCOUNT CREATION

  const [newAccountUsername,setNewAccountUsername] = useState('');
  const [newAccountPassword, setNewAccountPassword] = useState('');
  const [newAccountInterests,setNewAccountInterests] = useState('');
  const [newAccount, setNewAccount] = useState()

  const [creationSuccess, setCreationSuccess] = useState(false)





//updating accounts deleting/creating

  const postAccount = async () => {
    const newAccountInterestsArray = newAccountInterests.split(',');
    const newAccount = {
        username: newAccountUsername,
        password: newAccountPassword,
        interests: newAccountInterestsArray,
    }
    try{
        const resp = await fetch(USERS_END, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAccount),
       });
       if (resp.ok){
        const newUSERS = await resp.json();
        setUSERS([...USERS, newUSERS]);
        setCreationSuccess(true);
        setNewAccountUsername('');
        setNewAccountPassword('');
        setNewAccountInterests('')
        } 
    }catch (e) {
        console.log(`PostAccount had an error: ${e}`);
      }
  }

  const accountDeleteFunction = async (key) =>{
    try{
        const resp = await fetch(`${USERS_END}/${key}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },
        });
        if(resp.ok){
            getUsers();
        }
    }catch(e){
        console.log(`accountDeleteFunction had an error: ${e}`);
    }
  };


///////////////////COOKIES

  const setCookie = (name, value, days) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
  
    const cookie = `logged=${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookie;
  };

  const getCookie = () => {
    const cookies = document.cookie.split('; ');
    console.log("cookies = " + cookies)
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      console.log("cookie = " + cookie)
      if (cookie[0] === 'logged') {
        console.log("cookie success");
        getCookieLogin(cookie[2]);
      }
    }
    return null;
  };

  const getCookieLogin = async (cookieid) => {
    try{
      const resp = await fetch(`${USERS_END}/${cookieid}`);
      const USER_INFO = await resp.json();
      if(resp.ok){
        setUSER_INFO(USER_INFO);
        console.log(USER_INFO.username);
        setLoggedIn(true)
        setUsername(USER_INFO.username)
      }
    }catch (e){
      console.log(`getcookie had an error: ${e}`);
    }
  }

  const deleteCookies = (username, id) => {
    document.cookie = `logged=${username}=${id}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

////////////////

  return (
    <div>
      <NavbarMain/>

      <Routes>
        
        <Route path='/Portfilo/' element={<Home 
          loggedIn={loggedIn}
          loggedInUsername={username}
          USER_INFO={USER_INFO}/>} />
        <Route path='/Portfilo/Gallery/' element={<Gallery/>}/>
        <Route path='/Portfilo/Projects/'>
            <Route path='' element={<ProjectsList
              loggedIn={loggedIn}
              loggedInUsername={username}
              setSelectedProject={setSelectedProject}/>}
            />

            <Route path=":id" element={<ProjectSubPage
              selectedProject={selectedProject}/>}
            />
        </Route>
        

        
            
        <Route path='/Portfilo/Login/' element={<Login  
          loggedInFunction={loggedInFunction} 
          updateUsername={updateUsername} 
          updatePassword={updatePassword}
          LoggedInPassword={password} 
          loggedInUsername={username} 
          loggedIn={loggedIn}
          postAccount={postAccount}
          accountDeleteFunction={accountDeleteFunction}
          USERS={USERS}
          logoutFunction={logoutFunction}
          setNewAccountUsername={setNewAccountUsername}
          setNewAccountPassword={setNewAccountPassword}
          setNewAccountInterests={setNewAccountInterests}
          newAccountUsername={newAccountUsername}
          newAccountPassword={newAccountPassword}
          newAccountInterests={newAccountInterests}
          />}/>
      </Routes>
    </div>
  );
}

export default App;
