import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import NavBar from './components/NavBar'
import BookShelf from './components/BookShelf'
import BookSearch from './components/BookSearch'
import './App.css'

class BooksApp extends Component {
  constructor(props) {
    super(props)

    this.updateReadingStatus = this.updateReadingStatus.bind(this)
    this.addBookAndUpdate = this.addBookAndUpdate.bind(this)
    this.searchNewBooks = this.searchNewBooks.bind(this)
  }

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    lastQuery: '',
    searchResults: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }


  updateReadingStatus(book, status) {
    const books = this.state.books
    BooksAPI.update(book, status).then(() => {
      const stateBook = books.find((b => ( b.id === book.id ) ))
      stateBook.shelf = status
      this.setState({ books: books })
    })
  }

  addBookAndUpdate(book, status) {
    const books = this.state.books
    books.push(book)
    this.setState({ books: books })
    this.updateReadingStatus(book, status)
  }

  searchNewBooks(query) {
    console.log("Searching for...", query)
    const searchTerm = query.trim()
    if (searchTerm) {
      BooksAPI.search(searchTerm, 12).then((searchResults) => {
        //const stateBook = books.find((b => ( b.id === book.id ) ))
        //stateBook.shelf = status
        //this.setState({ books: books })
        console.log("Results of "+query, searchResults)
        if (!searchResults.hasOwnProperty('error'))
          this.setState({ searchResults: searchResults })
      })
    }
  }



  render() {
    return (
      <div className="app">
        {/*this is a TESTING route*/}
        <Route exact path="/tester" render={() => (
          <div>
            <h1>{this.props.tester}</h1>
          </div>
        )} />

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
              <NavBar />
            </div>
            <div className="list-books-content">
              <BookShelf books={this.state.books} updateReadingStatus={this.updateReadingStatus} />
            </div>
          </div>
        )} />

        <Route exact path="/search" render={() => (
          <div>
            <BookSearch
              search={this.searchNewBooks}
              results={this.state.searchResults}
              addBookAndUpdate={this.addBookAndUpdate}
            />
          </div>
        )} />


        {/**
         * TODO: Remove the following code after the React Router alternatives are implemented
         * (this is being left in currently for reference)
         */}

        <footer>{this.props.tester}</footer>
      </div>
    )
  }
}

export default BooksApp
