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
        <div></div>
      )
    }
  }

  return (
    <div >
        <div className='projectpost'>
          
          <img className='projectimage' src={props.image}/>
          <Link className='antilink' to={{pathname: `/Portfilo/Projects/${props.id}`, state: props.id}}>
          <h2 className='projecttitle'>{props.name}</h2>
    
          
          </Link>
          {ifLoggedInDisplay()}
        </div>
        
        
    </div>
  )
}

export default ProjectPost