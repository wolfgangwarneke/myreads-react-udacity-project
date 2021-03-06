import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class BookShelf extends Component {
  render() {
    const booksRead = this.props.books.filter((book) => book.shelf === "read")
    const booksWantToRead = this.props.books.filter((book) => book.shelf === "wantToRead")
    const booksCurrentlyReading = this.props.books.filter((book) => book.shelf === "currentlyReading")
    const updateReadingStatus = this.props.updateReadingStatus

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {booksCurrentlyReading.map(book => (
                <li key={book.id}>
                  <Book
                    updateReadingStatus={this.props.updateReadingStatus}
                    book={ book }
                    books={ this.props.books }
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Want to Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {booksWantToRead.map(book => (
                <li key={book.id}>
                  <Book
                    updateReadingStatus={updateReadingStatus}
                    book={ book }
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Already Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {booksRead.map(book => (
                <li key={book.id}>
                  <Book
                    updateReadingStatus={updateReadingStatus}
                    book={ book }
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="open-search">
        <Link to="/search">Add a book</Link>
        </div>
      </div>

    )
  }
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  updateReadingStatus: PropTypes.func.isRequired
}

export default BookShelf
