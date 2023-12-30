import { Button } from 'bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'

function NavbarMain() {
  return (
    <div >
      <div className='navbarcontainer'>
        <h2 className='navbartitle'>Camille West</h2>
        <Link to='/Portfilo/'><button className='navbarbutton'>Home</button></Link>
        {/* <Link to='/Portfilo/Gallery/'><button className='navbarbutton'>Gallery</button></Link> */}
        <Link to='/Portfilo/Projects/'><button className='navbarbutton'>Projects</button></Link>
        <Link to='/Portfilo/Login/'><button className='navbarbutton'>Login</button></Link>
      </div>
    </div>
    
  )
}

export default NavbarMain