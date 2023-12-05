import React from 'react'

function interestsFunction(interest){
  if(interest == "Raspberry Pi")
    return(
      <div></div>
    )
}


function Home(props) {
  if(props.loggedInUsername == "Camille"){
    return(
      <h1>Hello Me!</h1>
    )
  }else if(props.loggedIn){
    return(
      <div>
        <h1>Hello{props.loggedInUsername}</h1>
        {props.USER_INFO.interests.map((interest)=>(
        <div>{interestsFunction(interest)}</div>
      ))}
      </div>
      
    )
    
  }
}

export default Home