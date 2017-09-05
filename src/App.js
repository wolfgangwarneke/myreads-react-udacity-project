import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import NavBar from './components/NavBar'
import BookShelf from './components/BookShelf'
import BookSearch from './components/BookSearch'
import BookDetails from './components/BookDetails'
import './App.css'

class BooksApp extends Component {
  constructor(props) {
    super(props)

    this.updateReadingStatus = this.updateReadingStatus.bind(this)
    this.addBookAndUpdate = this.addBookAndUpdate.bind(this)
    this.searchNewBooks = this.searchNewBooks.bind(this)
    this.getBookById = this.getBookById.bind(this)
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
    searchResults: [],
    detailBook: null
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({ books })
    })
  }

  updateReadingStatus(book, status) {
    const books = this.state.books
    BooksAPI.update(book, status).then(() => {
      if (status !== "none" && status) {
        const stateBook = books.find((b => ( b.id === book.id ) ))
        stateBook.shelf = status
        this.setState({ books: books })
      } else {
        this.setState({ books: books.filter((b) => ( b.id !== book.id ) ) })
      }
    })
  }

  addBookAndUpdate(book, status) {
    //do not add the book if it is already in the user's books
    const books = this.state.books
    if ( !books.find((b => ( b.id === book.id ))) )
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
        if (!searchResults.hasOwnProperty('error')) {
          this.setState({ searchResults: searchResults })
        } else {
          this.setState({ searchResults: []})
        }
      })
    }
  }

  getBookById(id) {
    BooksAPI.get(id).then((book)=> {
      console.log("App getBookById response", book)
      this.setState( { detailBook: book } )
    })
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
              books={this.state.books}
              search={this.searchNewBooks}
              results={this.state.searchResults}
              addBookAndUpdate={this.addBookAndUpdate}
            />
          </div>
        )} />

        <Route path="/book/:id" render={(r) => (
          <BookDetails
            bookID={r.match.params.id}
            book={this.state.detailBook}
            getBookById={this.getBookById}
          />
        )} />



        <footer>MyReads 2017 Udacity React Nanodegree Wolfgang Warneke</footer>
      </div>
    )
  }
}

export default BooksApp
