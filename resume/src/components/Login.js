import React, { useState } from 'react'

function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


  return (
    <div>
        <form>
            <input placeholder='name' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </form>
        <button onClick={props.loggedIn(username,password)}>Log in</button>
    </div>
  )
}

export default Login