import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import PageHeader from './components/PageHeader'
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
    showSearchPage: false,
    books: [],
    lastQuery: '',
    searchResults: [],
    maxResults: 20,
    detailBook: null
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateReadingStatus(book, status) {
    const books = this.state.books
    const stateBook = books.find((b => ( b.id === book.id ) )) || book // TO DO fix bug, not fully fixed
    BooksAPI.update(book, status).then(() => {
      if (status !== "none" && status) {
        stateBook.shelf = status
        this.setState({ books: books })
        if (this.state.detailBook && stateBook.id === this.state.detailBook.id)
          this.setState({ detailBook: stateBook })
      } else {
        this.setState({ books: books.filter((b) => ( b.id !== book.id ) ) })
        if (stateBook.id === this.state.detailBook.id)
          stateBook.shelf = status
          this.setState({ detailBook: stateBook })
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
    const searchTerm = query.trim()
    if (searchTerm) {
      // Note: BooksAPI search does not seem to respond to differing max results values
      BooksAPI.search(searchTerm, this.state.maxResults).then((searchResults) => {
        //const stateBook = books.find((b => ( b.id === book.id ) ))
        //stateBook.shelf = status
        //this.setState({ books: books })
        if (!searchResults.hasOwnProperty('error')) {
          this.setState({ searchResults: searchResults })
        } else {
          this.setState({ searchResults: []})
        }
      })
    }
  }

  getBookById(id) {
    const self = this
    // setTimeout(function(){
    //   console.log("3 sec timesout...");
    //   BooksAPI.get(id).then((book)=> {
    //     console.log("App getBookById response", book)
    //     self.setState( { detailBook: book } )
    //   })
    // }, 3000);
    BooksAPI.get(id).then((book)=> {
      self.setState( { detailBook: book } )
    })

  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <PageHeader />
            <div className="list-books-content">
              <BookShelf
                books={this.state.books}
                updateReadingStatus={this.updateReadingStatus}
              />
            </div>
          </div>
        )} />

        <Route exact path="/search" render={({history}) => (
          <div>
            <BookSearch
              books={this.state.books}
              search={this.searchNewBooks}
              query={this.state.lastQuery}
              results={this.state.searchResults}
              addBookAndUpdate={this.addBookAndUpdate}
              history={history}
            />
          </div>
        )} />

        <Route exact path="/search/:query" render={(r) => (
          <div>
            <BookSearch
              books={this.state.books}
              search={this.searchNewBooks}
              query={r.match.params.query}
              results={this.state.searchResults}
              addBookAndUpdate={this.addBookAndUpdate}
              history={r.history}
            />
          </div>
        )} />

        <Route path="/book/:id" render={(r) => (
          <div>
            <PageHeader />
            <BookDetails
              bookID={r.match.params.id}
              book={this.state.detailBook}
              getBookById={this.getBookById}
              updateReadingStatus={this.addBookAndUpdate}
            />
          </div>
        )} />



        <footer>
          <span className="brand-font">MyReads</span>
          2017 Udacity React Nanodegree Wolfgang Warneke
        </footer>
      </div>
    )
  }
}

export default BooksApp
