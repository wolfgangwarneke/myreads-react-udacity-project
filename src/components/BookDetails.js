import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

class BookDetails extends Component {
  componentDidMount() {
    console.log("Book details mounted")
    console.log("ID:   ", this.props.bookID)
    this.props.getBookById(this.props.bookID)
  }

  render() {
    console.log("Book details props:", this.props)

    return (
      <div className="book">
        <h1>{this.props.bookID}</h1>
        <h3>Wow that is a nice book id!</h3>
      </div>
    )
  }
}

export default BookDetails
