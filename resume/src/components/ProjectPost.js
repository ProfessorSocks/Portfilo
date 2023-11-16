import React from 'react'

function ProjectPost(props) {

    //create a funct


  return (
    <div>
        <img src={props.image}/>
        <h2>{props.name}</h2>
        <p>{props.desc}</p>
        {props.todo?.map((thing)=> (
            <h6>{thing}</h6>
        ))}
    </div>
  )
}

export default ProjectPost