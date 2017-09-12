import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navigation">
      <ul>
        <li><Link to="/search">Search/Add</Link></li>
        <li><Link to="/">Bookshelf</Link></li>
      </ul>
    </nav>
  )
}


export default NavBar
