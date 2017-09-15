import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">My Bookshelf</Link>
        </li>
        <li>
          <Link to="/search">Search/Add</Link>
        </li>
      </ul>
    </nav>
  )
}


export default NavBar
