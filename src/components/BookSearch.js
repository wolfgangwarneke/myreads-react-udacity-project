import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'

class BookSearch extends Component {
  componentDidMount() {
    if (this.props.query) {
      const searchInput = document.getElementById("search-input")
      searchInput.value = this.props.query
      this.props.search(this.props.query)
    }
  }

  render() {
    const userBooksIDs = this.props.books.map((b) => b.id)

    return (
      <div className="search-books sticky-wrap">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              id="search-input"
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => {
                this.props.search(e.target.value)
              }}
              onKeyPress={(e) => {
                if(e.key === 'Enter') {
                  this.props.history.push('/search/' + e.target.value)
                }
              }}
            />

          </div>
        </div>
        <div className="search-books-results">
          {this.props.results.length > 0 ?
            (<ol className="books-grid">
              {this.props.results.map(book => (
                <li
                  key={book.id}
                  className={userBooksIDs.includes(book.id) ? "userBook" : "notUserBook"}
                >
                  <Book
                    updateReadingStatus={this.props.addBookAndUpdate}
                    book={ book }
                    books={ this.props.books }
                    userBooksIDs={userBooksIDs}
                    inLibrary={userBooksIDs.includes(book.id)}
                  />
                </li>
              ))}
            </ol>)
            : <h3>No results yet</h3>}
        </div>
      </div>
    )
  }
}

BookSearch.propTypes = {
  books: PropTypes.array,
  search: PropTypes.func,
  query: PropTypes.string,
  results: PropTypes.array,
  addBookAndUpdate: PropTypes.func,
  history: PropTypes.object
}

export default BookSearch
