import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
      const titleTerms = book.title.match(/\S+/g) || []
      console.log("Title terms...", titleTerms)

      return (
        <div>
          <div className="book-details-primary">
            <div className="book-details-main-info">
              <h1>{book.title}</h1>
              <h5>
                {book.hasOwnProperty('authors') ? book.authors.map((author, index) => (<span key={author}>{(index === 0) ? "by " : ""}{author}{(index+1 !== book.authors.length) ? ", " : ""}</span>)) : ""}
              </h5>
            </div>
            <div className="book-details-thumbnail">
              <img src={book.imageLinks.thumbnail} />
            </div>
          </div>
          <div className="book-details-description">
            <hr />
            <h2>Description</h2>
            <p>{book.description}</p>
          </div>
          <hr />
          <h2>Details</h2>
          <div>
            <span>More about </span>
            {titleTerms.map((term) => (
              <Link to="/search" key={term}>{term}</Link>
            ))}
          </div>
        </div>
      )
    } else if (book || book === null) {
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
