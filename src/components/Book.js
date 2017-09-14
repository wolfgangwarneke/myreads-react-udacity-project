import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Book extends Component {

  render() {
    let book
    if (this.props.book.shelf)
      book = this.props.book
    else
      book = this.props.userBooksIDs.includes(this.props.book.id) ? this.props.books.find((b => ( b.id === this.props.book.id ) )) : this.props.book
    const thumbnail = book.hasOwnProperty('imageLinks') && book.imageLinks.hasOwnProperty('smallThumbnail') ? book.imageLinks.smallThumbnail : "TODO-replaceurl.jpg"

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" + thumbnail + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "contain" }}></div>
          <div className="book-shelf-changer">
            <select value={book.hasOwnProperty('shelf') ? book.shelf : "none"} onChange={(e) => this.props.updateReadingStatus(book, e.target.value)} >
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title"><Link to={`/book/${book.id}`}>{book.title}</Link></div>
        <div className="book-authors">
          {book.hasOwnProperty('authors') ? book.authors.map((author, index) => (<span key={author}>{(index === 0) ? "by " : ""}{author}{(index+1 !== book.authors.length) ? ", " : ""}</span>)) : ""}
        </div>
        {this.props.inLibrary ? <div className="book-in-library"><em>(currently in library)</em></div> : ""}
      </div>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  books: PropTypes.array,
  updateReadingStatus: PropTypes.func.isRequired,
  userBooksIDs: PropTypes.array,
  inLibrary: PropTypes.bool
}

export default Book
