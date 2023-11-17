import React from 'react'

function ProjectPost(props) {


  function handleProjectDelete(){
    props.projectDeleteFunction(props.id)
  }
    //create a funct
  function ifLoggedInDisplay(){
    if(props.loggedInUsername === 'Camille'){
      return(
        <div>
          <h4>Hi camille</h4>
          <button onClick={handleProjectDelete}>delete</button>
        </div>
      )
    }else if(props.loggedIn){
      return(
        <div>hi</div>
      )
    }
  }

  return (
    <div>
        <img src={props.image}/>
        <h2>{props.name}</h2>
        <p>{props.desc}</p>
        {props.todo?.map((thing)=> (
            <h6>{thing}</h6>
        ))}
        {ifLoggedInDisplay()}
    </div>
  )
}

export default ProjectPost