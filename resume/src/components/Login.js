import React, { useEffect, useState } from 'react'
import UserProfileLogin from './UserProfileLogin';

function Login(props) {

    const USERS_END = 'https://654c00f177200d6ba8587034.mockapi.io/Users'

    const [USERS, setUSERS] = useState([]); 


    //these are updated everytime you type something in the inputs down below
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [yesCreate, setYesCreate] = useState(false);

    const [newAccountUsername,setNewAccountUsername] = useState('');
    const [newAccountPassword, setNewAccountPassword] = useState('');
    const [newAccountInterests,setNewAccountInterests] = useState([]);
    const [newAccount, setNewAccount] = useState()

    const [creationSuccess, setCreationSuccess] = useState(false)

    function createAccountFunc(){
        if (yesCreate){
            if(creationSuccess){
                return(
                   <h1>You have created an account</h1> 
                )
            }else{
                return(
                    <div>
                        <input placeholder='New Account Username' value={newAccountUsername} onChange={(e)=> setNewAccountUsername(e.target.value)}/>
                        <input placeholder='New Account Password' value={newAccountPassword} onChange={(e)=> setNewAccountPassword(e.target.value)}/>
                        <br/>
                        Choose interests from things you're interested in seeing my work in
                        Examples are react, javascript, raspberry pi and python
                        <input placeholder='interests (separate by ,)' value={newAccountInterests} onChange={(e)=> setNewAccountInterests(e.target.value)} />
                        <button onClick={props.postAccount}>Submit</button>
                    </div>
                )
            }
            
        }else{
            return(
                <div></div>
            )
        }
    }

    //need to create a fetch and a post function for updating users
    //post function will take newaccount parameters'
    //create an object and then pass that object to
    // ../users

    

    //takes state from new account state
    
    


    function displayIfLoggedIn(){
        if(props.loggedIn){
            return(
                <alert>Logged in!</alert>
            )
        }
    }

  return (
    <div>
        <form>
            <input placeholder='name' value={props.loggedInUsernamesername} onChange={(e) => props.updateUsername(e.target.value)} />
            <input placeholder='password' value={props.loggedInPassword} onChange={(e) => props.updatePassword(e.target.value)}/>
        </form>
        
        <button onClick={()=>props.loggedInFunction()}>Log in</button>
        {displayIfLoggedIn()}
        <br></br>
        <h2>make an account?</h2>
        <button onClick={() => setYesCreate(true)} >Yes</button>
        {createAccountFunc()}
        <br></br>
        <br/>
        <h1>List of Users</h1>
        {props.USERS.map((user)=>(
            <UserProfileLogin accountDeleteFunction={props.accountDeleteFunction} 
                loggedInUsername={props.loggedInUsername}  
                username={user.username} 
                image={user.image} 
                interests={user.interests} 
                key={user.id} 
                id={user.id}/>
        ))}
    </div>
  )
}
//button calls function from app.js

export default Login