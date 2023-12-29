import React from 'react'



function UserProfileLogin(props) {

    //need to make a button that deletes account
    //and calls delete function from parent(login.js)

    const accountDeleteHandle = () => {
        if(props.loggedInUsername === 'Camille') {
            return(
                <button onClick={() => props.accountDeleteFunction(props.id)}>Delete</button>
            )
        }
    }

  return (
    <div>
        <h1>{props.username}</h1>
        {/* <img src={props.image} placeholder={props.image} alt='User chose not to provide an image'/> */}
        <p>{props.interests.map((interest)=> (
            <h6>-> {interest}</h6>
        ))}</p>
        {accountDeleteHandle()}
    </div>
  )
}

export default UserProfileLogin