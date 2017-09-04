import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

class BookShelf extends Component {
  render() {
    const booksRead = this.props.books.filter((book) => book.shelf === "read")
    const booksWantToRead = this.props.books.filter((book) => book.shelf === "wantToRead")
    const booksCurrentlyReading = this.props.books.filter((book) => book.shelf === "currentlyReading")

    return (
      <div>
        <h2>This is a bookshelf.</h2>
        <p>Not a great bookshelf yet though.  But one day it <em>will</em> be!</p>
        Books read
        <ol>
          {booksRead.map(book => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ol>
        Books reading
        <ol>
          {booksCurrentlyReading.map(book => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ol>
        Books would like to read
        <ol>
          {booksWantToRead.map(book => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ol>
      </div>

    )
  }
}

export default BookShelf
