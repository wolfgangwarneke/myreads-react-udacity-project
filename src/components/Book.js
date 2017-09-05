import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

class Book extends Component {


  render() {
    const book = this.props.book

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" + book.imageLinks.smallThumbnail + ")" }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(e) => this.props.updateReadingStatus(book, e.target.value)} >
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.hasOwnProperty('authors') ? book.authors.map(author => (<span key={author}>{author}</span>)) : ""}
        </div>
      </div>
    )
  }
}

export default Book
