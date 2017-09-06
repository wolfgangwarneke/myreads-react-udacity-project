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
            <h1 className="center-text">{book.title}</h1>
            <div className="book-details-main-info">
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
          <div className="book-details-details-info">
            <hr />
            <h2>Details</h2>
            <ul>
              <li>{book.printType}: <span>{book.pageCount ? book.pageCount + " pages" : "unknown page count"}</span></li>
              {book.publisher ? <li>Publisher: <span>{book.publisher}</span></li> : ""}
              {book.language ? <li>Language: <span>{book.language.toLowerCase() === "en" ? "English" : book.language}</span></li> : ""}
              {book.industryIdentifiers ? book.industryIdentifiers.map((i) => (
                <li key={i.type + "_" + i.identifier}>{i.type.replace(/[_]/g, "-")}: <span>{i.identifier}</span></li>
              )) : ""}
              {book.averageRating ? <li>Customer rating: {book.averageRating} {
                book.ratingsCount ? "based on " + book.ratingsCount + " reviews" : ""
              }</li> : ""}
            </ul>
          </div>
          <div>
            <hr />
            <span>More about </span>
            {titleTerms.map((term) => (
              <Link to="/search" className="search-term-button" key={term}>{term}</Link>
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
