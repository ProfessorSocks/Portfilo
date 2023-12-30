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


///////////Uploading comments
  const [commentText,setCommentText] = useState('')




  return (
    <div className='fittopage '>
      <div className='containerright'>
        <div>
          <h2>Hello {props.loggedInUsername}</h2>
        </div>
        <div className=''>
        hello2
        {PROJECT_INFO.comments?.map((comment)=>(
          <div>
            <h3>{comment.username}</h3>
            <p>{comment.comment}</p>
          </div>
        ))}
        </div>
      </div>
      
      <div className='projectsubpage marginbox '>
        <h1>{PROJECT_INFO.name}</h1>
        <img className='projectimage' src={PROJECT_INFO.image}/>
        <div>
          <p>{PROJECT_INFO.desc}</p>
          <p>wip? - {PROJECT_INFO.WIP}</p>
          {PROJECT_INFO.todo?.map((thing)=> (
                <p>-> {thing}</p>

            ))}
        </div>
        <div>
        <h3>Comment here</h3>
        <textarea className='projectcommentbox'  placeholder='comment text' value={commentText} onChange={(e)=> setCommentText(e.target.value)}></textarea>
        <br></br>
        <button className='smalldotbutton'>Click to comment</button>
        </div>
      </div>
    </div>
  )
}

export default ProjectSubPage