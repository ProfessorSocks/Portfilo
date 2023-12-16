import React, { useEffect, useState } from 'react'
import ProjectPost from './ProjectPost'
import { Link, Route, Routes } from 'react-router-dom';
import ProjectSubPage from './ProjectSubPage';

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
////////// Delete / post project functions

    const [projectName, setProjectName] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [projectTodo, setProjectTodo] = useState('');
    const [projectKeys, setProjectKeys] = useState('');
    const [wip, setWip] = useState('false');

    const postProject = async() => {
        let newProjectTodo = projectTodo.split(',');
        let newProjectKeys = projectKeys.split(',');
        const newProject = {
          name: projectName,
          desc: projectDesc,
          todo: newProjectTodo,
          WIP: wip,
          keys: newProjectKeys
        }
        try{
            const resp = await fetch(PROJECT_END, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProject),
            } );
            if (resp.ok) {
                const newProjects = await resp.json();
                setProjects ([...projects, newProjects]);
                setProjectName('');
                setProjectDesc('')
            }
        }catch(e){
            console.log(`Post Project had an error ${e}`)
        }
    }

    const projectDeleteFunction = async (id) => {
        try{
            const resp = await fetch(`${PROJECT_END}/${id}` , {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (resp.ok){
                getProjects()
            }
        }catch (e) {
            console.log(`delete project had and error ${e}`)
        }
    } 

    
    
    

    const addForm = () => {
        if(props.loggedInUsername === 'Camille') {
            return(
                <div>
                    <form>
                        <input placeholder='Name of project' value={projectName} onChange={(e)=> setProjectName(e.target.value)}/>
                        <textarea placeholder='Enter information about project here' value={projectDesc} onChange={(e) => setProjectDesc(e.target.value)}/>
                        <textarea placeholder='Todo separate by ,' value={projectTodo} onChange={(e)=> setProjectTodo(e.target.value)}/>
                        <textarea placeholder='Keys separate by ,' value={projectKeys} on onChange={(e)=> setProjectKeys(e.target.value)}/>
                        <div>
                            WIP?
                            <div><input type='radio' value='true' name="WIP" onClick={(e)=> setWip(e.target.value)} /><label for="WIP">Yes</label><input type="radio" value="false" name="WIP" onClick={(e)=> setWip(e.target.value)}/><label name="WIP">No</label></div> 
                        </div>
                    </form>
                    <button onClick={postProject}>Submit</button>
                </div>
                
                
            )
        }else if(props.loggedIn){
            return(
                <div>you are logged in</div>
            )
        }else{
            return(
                <div>you are not logged in</div>
            )
        }
    }

    function setSelectedProject(id){
        props.setSelectedProject(id)
    }

  return (
    <div>
        {addForm()}
        {projects.map((project)=> (
            <ProjectPost image={project.image}
            id={project.id}
            name={project.name}
            WIP={project.WIP}
            desc={project.desc}
            loggedIn={props.loggedIn}
            loggedInUsername={props.loggedInUsername}
            projectDeleteFunction={projectDeleteFunction}
            todo={project.todo}
            wip={project.WIP}
            keys={project.keys}
            setSelectedProject={setSelectedProject}
            //todo={project.todo}
            //fix above typeerror not a function
            //might be because not multiple in array yet
            //

            />
            

        ))}
        <br></br>
        
    </div>
  )
}

export default ProjectsList