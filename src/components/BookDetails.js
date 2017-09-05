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
    console.log("Book details book", this.props.book)
    const book = this.props.book
    if (book && book.id === this.props.bookID) {
      return (
        <div>
          <h1>{book.title}</h1>
          <h5>
            {book.hasOwnProperty('authors') ? book.authors.map(author => (<span key={author}>{author}</span>)) : ""}
          </h5>
          <div>
            <img src={book.imageLinks.thumbnail} />
          </div>
          <p>{book.description}</p>
        </div>
      )
    } else if (book) {
      return (
        <div>
          <h1>LOADING</h1>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Whoops!</h1>
          <h2>That book cannot seem to be found right now.</h2>
        </div>
      )
    }
  }
}

export default BookDetails
