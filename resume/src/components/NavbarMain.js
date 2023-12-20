import { Button } from 'bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'

function NavbarMain() {
  return (
    <div className='navbarcontainer'>
        <h2>Camille West</h2>
        <Link to='/Portfilo'><button>Home</button></Link>
        <Link to='/Portfilo/Gallery'><button>Gallery</button></Link>
        <Link to='/Portfilo/Projects'><button>Projects</button></Link>
        <Link to='/Portfilo/Login'><button>Login</button></Link>
    </div>
  )
}

export default NavbarMain