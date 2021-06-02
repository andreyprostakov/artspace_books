import { isArray } from 'lodash'
import { objectToParams } from 'utils/objectToParams'
import AuthorDetails from 'serverApi/AuthorDetails'
import Book from 'serverApi/Book'
import BookDetails from 'serverApi/BookDetails'

class ApiClient {
  getYears() {
    return $.ajax({ url: '/years.json' })
  }

  getAuthorYears(authorId) {
    return $.ajax({
      url: `/years.json?${ objectToParams({ author_id: authorId }) }`
    })
  }

  getAuthors() {
    return $.ajax({ url: '/authors.json'})
  }

  getAuthor(id) {
    return $.ajax({ url: `/authors/${id}.json` })
  }

  getAuthorDetails(id) {
    return $.ajax({
      url: `/authors/${id}/details.json`
    }).then((data) => AuthorDetails.serverDataToObject(data))
  }

  putAuthorDetails(id, details) {
    const body = AuthorDetails.objectToServerData(details)
    return $.ajax({
      url: `/authors/${id}/details.json`,
      type: 'PUT',
      data: { author: body }
    })
  }

  postAuthorDetails(details) {
    const body = AuthorDetails.objectToServerData(details)
    return $.ajax({
      url: '/authors/details.json',
      type: 'POST',
      data: { author: body }
    })
  }

  getBooks(query = {}) {
    return $.ajax({
      url: `/books.json?${objectToParams(query)}`
    }).then((books) => books.map(bookData => Book.parse(bookData)))
  }

  getAuthorBooks(authorId) {
    return $.ajax({
      url: `/books.json?${ objectToParams({ author_id: authorId }) }`
    }).then((books) => books.map(bookData => Book.parse(bookData)))
  }

  getBook(id) {
    return $.ajax({
      url: `/books/${id}.json`
    }).then((data) => Book.parse(data))
  }

  getBookDetails(id) {
    return $.ajax({
      url: `/books/${id}/details.json`
    }).then((data) => BookDetails.parse(data))
  }

  putBookDetails(id, details) {
    const body = BookDetails.objectToServerData(details)
    return $.ajax({
      url: `/books/${id}/details.json`,
      type: 'PUT',
      data: { book: body }
    })
  }

  postBookDetails(details) {
    const body = BookDetails.objectToServerData(details)
    return $.ajax({
      url: '/books/details.json',
      type: 'POST',
      data: { book: body }
    })
  }

  getTags() {
    return $.ajax({ url: '/tags.json' })
  }
}

export default new ApiClient()
