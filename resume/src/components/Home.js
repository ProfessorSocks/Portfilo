import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';







function Home(props) {

  const PROJECT_END = 'https://654c00f177200d6ba8587034.mockapi.io/projects';

  const [projectsHome, setProjectsHome] = useState([]);
  const [raspberryPiProjects, setRaspberryPiProjects] = useState([]);


  useEffect(()=>{
      getProjectsHome();
      log();
  },[])

  

  const getProjectsHome = async () => {
        try{
            const resp = await fetch(PROJECT_END);
            const data = await resp.json();
            return setProjectsHome(data);
        }catch(e){
            console.log(`getProjects had an error: ${e}`);
        }
        
  }

  function log(){
    console.log(projectsHome)
  }
    

  const raspberrypi= () => {
    let raspberrypiprojectsArr = [];
    
    console.log(`raspberrypi function projects call is ${projectsHome}`);
    projectsHome.map((project) => {
      if (project.keys.includes('raspberry pi')) {
        let id = project.id;
        let projectName = project.name;
        raspberrypiprojectsArr.push({name: projectName, id: id});
        console.log("project = " + id + '\nproject name = ' + projectName);
      }
    })
    setRaspberryPiProjects(raspberrypiprojectsArr);
    console.log("raspberry pi projects = " + raspberrypiprojectsArr);

  }

    
  let listOfIds = []
  let listOfNames = []  

  function interestPage(key,interest,id,name){
    // if(!listOfIds.includes(id)){
    //   listOfIds.push(id)
    // }  
    if(key == interest && !listOfNames.includes(name) ){
      listOfIds.unshift(id)
      listOfNames.push(name)
      console.log(listOfIds)
      return(
        <div>
          <Link to={`Portfilo/Projects/${id}`}>{name}</Link>
        </div>
      )
    }
  }

  function interestsFunction(){
    // for(let i = 0; i < props.USER_INFO.interests.length; i++){
    //   return(
    //     <div>{props.USER_INFO.interests[i]}</div>
    //   )
    // }
    return(
      
      <div>
        <h2>Some projects you may like</h2>
        {props.USER_INFO.interests.map((interest)=> (
          <div>{projectsHome.map((project)=> (
            <div>{project.keys.map((key)=> (
              <div>
                <h1></h1>
                {interestPage(key,interest,project.id,project.name)}
              </div>
            ))}</div>
          ))}</div>
        ))}
      </div>
    )
  }

  if(props.loggedInUsername == "Camille"){
    return(
      <h1>Hello Me!</h1>
    )
  }else if(props.loggedIn){
    return(
      <div>
        <h1>Hello {props.loggedInUsername}</h1>
        <div>{interestsFunction()}</div>
      </div>
      
    )
    
  }else{
    return(
      <div>
        <h1>Hey you're not logged in!</h1>
        <p>I suggest you log in to see customized content!</p>
      </div>
    )
  }

}

export default Home