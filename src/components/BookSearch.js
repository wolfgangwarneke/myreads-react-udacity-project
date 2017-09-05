import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './../utils/BooksAPI'
import Book from './Book'

class BookSearch extends Component {
  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  componentWillUpdate() {
    console.log("Hello from component will update")
    console.log("Query...", this.state.query)
    if (this.state.query)
      this.props.search(this.state.query)
  }

  render() {
    const userBooksIDs = this.props.books.map((b) => b.id)
    console.log ("User book ids...", userBooksIDs)

    return (
      <div className="search-books">
        <div className="search-books-bar">
        <Link
          to="/"
          className="close-search"
        >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => {
                this.props.search(e.target.value)
              }}
            />

          </div>
        </div>
        <div className="search-books-results">
          <h3>Search results component.  Hello there!</h3>
          <h6>Query is: {this.state.query}</h6>
          <ol className="books-grid">
            {this.props.results.map(book => (
              <li key={book.id}>
                {//TODO pass the necessary props to Book component to add new book to library
                }
                <Book
                  updateReadingStatus={this.props.addBookAndUpdate}
                  book={ book }
                  books={ this.props.books }
                  userBooksIDs={userBooksIDs}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
