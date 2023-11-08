import { Button } from 'bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'

function NavbarMain() {
  return (
    <div className='navbarcontainer'>
        <h2>Camille West</h2>
        <Link to='/'><button>Home</button></Link>
        <Link to='/Gallery'><button>Gallery</button></Link>
        <Link to='/Projects'><button>Projects</button></Link>
        <Link to='/Login'><button>Login</button></Link>
    </div>
  )
}

export default NavbarMain