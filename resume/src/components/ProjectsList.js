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


    

    const addForm = () => {
        if(props.loggedIn) {
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
            <ProjectPost image={project.image} 
            name={project.name}
            WIP={project.WIP}
            desc={project.desc}
            //todo={project.todo}
            //fix above typeerror not a function
            //might be because not multiple in array yet
            //

            />
        ))}
    </div>
  )
}

export default ProjectsList