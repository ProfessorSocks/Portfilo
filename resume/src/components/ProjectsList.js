import React, { useEffect, useState } from 'react'
import ProjectPost from './ProjectPost'

function ProjectsList(props) {

    const PROJECT_END = 'https://654c00f177200d6ba8587034.mockapi.io/projects';

    const [projects, setProjects] = useState([]);

    const getProjects = async () => {
        try{
            const resp = await fetch(PROJECT_END);
            const projects = await resp.json();
            return setProjects(projects);
        }catch(e){
            console.log(`getProjects had an error: ${e}`);
        }
    }

    useEffect(()=>{
        getProjects()
    },[])


    let Loggedin = false

    const addForm = () => {
        if(Loggedin) {
            return(
                <div>You are logged in</div>
            )
        }else{
            return(
                <div>you are not logged in</div>
            )
        }
    }

  return (
    <div>
        {addForm()}
        {projects.map((project)=> (
            <ProjectPost image={project.image} />
        ))}
    </div>
  )
}

export default ProjectsList