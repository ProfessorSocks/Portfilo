import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ProjectSubPage(props, { match }) {
  let {id} = useParams()

  let PROJECTS_END = 'https://654c00f177200d6ba8587034.mockapi.io/projects'

  let [PROJECT_INFO, setPROJECT_INFO] = useState({})

  const getProject = async () => {
    try{
      const resp = await fetch(`${PROJECTS_END}/${id}`)
      PROJECT_INFO = await resp.json();
      if(resp.ok){
        setPROJECT_INFO(PROJECT_INFO)
        console.log(`project ${id} has been got and set`);
      }
    }catch(e){
      console.log(`getProject had an error ${e}`);
    }
  }
  useEffect(()=> {
    getProject()
  },[])


  return (
    <div>
      <h1>{PROJECT_INFO.name}</h1>
      <img src={PROJECT_INFO.image}/>
      <div>
        <p>{PROJECT_INFO.desc}</p>
        <p>{PROJECT_INFO.todo}</p>
        <p>wip? - {PROJECT_INFO.WIP}</p>
      </div>
    </div>
  )
}

export default ProjectSubPage