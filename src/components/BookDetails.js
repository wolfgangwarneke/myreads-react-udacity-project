import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import FiveStar from './FiveStar'
import PropTypes from 'prop-types'

class BookDetails extends Component {
  // terms to remove from related terms links
  filterTerms = ["the", "and", "you", "-", ":", "a", "&", "an","it", "by", "is", "or", "of", "on", "in", "for"] // must be lowercase

  componentDidMount() {
    this.props.getBookById(this.props.bookID)
  }

  radioCheckedShelfComparison(book, radioShelf) {
    return (book.shelf && book.shelf === radioShelf) ? "checked" : ""
  }

  render() {
    const book = this.props.book
    if (book && book.id === this.props.bookID) {
      const titleTerms = Array.from(new Set(book.title.match(/\S+/g)))
                          .filter((word) => !this.filterTerms.includes(word.toLowerCase()) )
                         || []

      return (
        <div>
          <div className="book-details-primary">
            <div className="book-details-main-info">
              <h1 className="center-text full-width-xs">{book.title}</h1>
              <h5 className="center-text full-width-xs">
                {book.hasOwnProperty('authors') ? book.authors.map((author, index) => (
                  <span key={author}>
                    {(index === 0) ? "by " : ""}
                    <Link
                      to={"/search/"+author}
                      className="details-author"
                      key={author.trim()}
                    >
                      {author}
                    </Link>
                    {(index+1 !== book.authors.length) ? ", " : ""}
                  </span>
                )) : ""}
              </h5>
              {book.averageRating ? (
                <FiveStar rating={book.averageRating} />
              ) : ""}
              <div className="book-details-actions-menu">
                <form>
                  <input
                    checked={this.radioCheckedShelfComparison(book, "currentlyReading")}
                    type="radio"
                    name="shelf-status"
                    id="reading-btn"
                    value={"currentlyReading"}
                    onChange={(e) => this.props.updateReadingStatus(book, e.target.value)}
                  />
                  <label htmlFor="reading-btn"> Currently Reading</label>
                  <input
                    checked={this.radioCheckedShelfComparison(book, "wantToRead")}
                    type="radio"
                    name="shelf-status"
                    id="would-read-btn"
                    value="wantToRead"
                    onChange={(e) => this.props.updateReadingStatus(book, e.target.value)}
                  />
                  <label htmlFor="would-read-btn"> Want to Read</label>
                  <input
                    checked={this.radioCheckedShelfComparison(book, "read")}
                    type="radio"
                    name="shelf-status"
                    id="read-btn"
                    value="read"
                    onChange={(e) => this.props.updateReadingStatus(book, e.target.value)}
                  />
                  <label htmlFor="read-btn"> Read</label>
                  <input
                    checked={this.radioCheckedShelfComparison(book, "none")}
                    type="radio"
                    name="shelf-status"
                    id="none-btn"
                    value="none"
                    onChange={(e) => this.props.updateReadingStatus(book, e.target.value)}
                  />
                  <label htmlFor="none-btn"> None</label>
                </form>
              </div>
            </div>
            <div className="book-details-thumbnail">
              <Book book={book} updateReadingStatus={this.props.updateReadingStatus} />
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
              {book.averageRating ? <li>Customer rating: <span>{book.averageRating} {
                book.ratingsCount ? "based on " + book.ratingsCount + " reviews" : ""
              }</span></li> : ""}
            </ul>
          </div>
          <div className="book-details-related">
            <hr />
            <div className="link-container">
              <span>More about </span>
              {titleTerms.map((term) => (
                <Link to={"/search/"+term} className="search-term-button" key={term}>{term}</Link>
              ))}
            </div>
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

BookDetails.propTypes = {
  bookID: PropTypes.string.isRequired,
  book: PropTypes.object,
  getBookById: PropTypes.func.isRequired,
  updateReadingStatus: PropTypes.func.isRequired
}

export default BookDetails
