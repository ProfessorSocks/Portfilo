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
          <Link className='antilink' to={`/Portfilo/Projects/${id}`}>{name}</Link>
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

  function aboutMe(){
    return(
      <div className=''>
        <div className=''>
          <h3>
            Hello welcome to my website. I made this website for employers like you to see what I can do!
            If you head to the project page you can see projects that have I done. If you sign up for an account you can see customized content on the home page
          </h3>
        </div>
        <br></br>
        <div className='containerleft'>
          <h2>About me</h2>
          <p>
            I am a talented, hardworking young woman. I have a natural affinity for tech. I built my first computer at sixteen. I also picked up coding the same year. I dabbled in python till I was twenty and took my first official computer programming course at the College of Southern Nevada. There I learned Javascript, HTML, and CSS. I graduated with an A and a bright outlook at the world. I then enrolled in their backend course and I am learning Java now. In my spare time I teach myself electrical and mechanical engineering, I train in swimming and running and play with my cats.
          </p>
        </div>
        <br></br>
        <div className='containerright'>
          <h2>Qualifications</h2>
          <p>- Python - Self Taught - 2 years </p>
          <p>- Front-End Development - College of Southern Nevada - 2023</p>
          <p>- Electrical HardWare - 1 year</p>
          <p>- Soldering - 1 year</p>
        </div>
        <div></div>
      </div>
    )
  }

  if(props.loggedInUsername == "Camille"){
    return(
      <h1>Hello Me!</h1>
    )
  }else if(props.loggedIn){
    return(
      <div className='fittopage marginbox'>
        <h1>Hello {props.loggedInUsername}</h1>
        <div>{interestsFunction()}</div>
        {aboutMe()}
      </div>
      
    )
    
  }else{
    return(
      <div className='fittopage marginbox'>
        <h1>Hey you're not logged in!</h1>
        <p>I suggest you log in to see customized content!</p>
        {aboutMe()}


      </div>
    )
  }

}

export default Home