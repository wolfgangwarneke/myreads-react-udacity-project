import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'

const PageHeader = (props) => {
  return (
    <div className="list-books-title">
      <h1><Link to="/">MyReads</Link></h1>
      <NavBar />
    </div>
  )
}


export default PageHeader
