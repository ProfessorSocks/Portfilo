import React from 'react'
import { Link } from 'react-router-dom'
import ProjectSubPage from './ProjectSubPage'

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
        <div>
          <Link to={{pathname: `Portfilo/Projects/${props.id}`, state: props.id}}>
          <img src={props.image}/>
          <h2>{props.name}</h2>
    
          
          </Link>
        </div>
        {ifLoggedInDisplay()}
        
    </div>
  )
}

export default ProjectPost