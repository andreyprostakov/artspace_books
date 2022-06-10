import { objectToParams } from 'utils/objectToParams'
import Author from 'serverApi/Author'
import AuthorDetails from 'serverApi/AuthorDetails'
import Book from 'serverApi/Book'
import BookDetails from 'serverApi/BookDetails'
import Tag from 'serverApi/Tag'
import jQuery from 'jquery'
// jQuery = window.$

class ApiClient {
  static getYears({ tagId } = {}) {
    return jQuery.ajax({
      url: `/years.json${ objectToParams({ 'tag_id': tagId }) }`
    })
  }

  static getAuthorYears(authorId) {
    return jQuery.ajax({
      url: `/years.json${ objectToParams({ 'author_id': authorId }) }`
    })
  }

  static getAuthors() {
    return jQuery.ajax({
      url: '/authors.json'
    }).then(authors => authors.map(data => Author.parse(data)))
  }

  static getAuthor(id) {
    return jQuery.ajax({
      url: `/authors/${id}.json`
    }).then(data => Author.parse(data))
  }

  static getAuthorDetails(id) {
    return jQuery.ajax({
      url: `/authors/${id}/details.json`
    }).then(data => AuthorDetails.serverDataToObject(data))
  }

  static putAuthorDetails(id, details) {
    const body = AuthorDetails.objectToServerData(details)
    return jQuery.ajax({
      url: `/authors/${id}/details.json`,
      type: 'PUT',
      data: { author: body }
    })
  }

  static postAuthorDetails(details) {
    const body = AuthorDetails.objectToServerData(details)
    return jQuery.ajax({
      url: '/authors/details.json',
      type: 'POST',
      data: { author: body }
    })
  }

  static getBooks({ years, authorId, tagId, page, perPage, sortBy }) {
    const params = {
      years,
      page,
      'author_id': authorId,
      'tag_id': tagId,
      'per_page': perPage,
      'sort_by': sortBy
    }
    return jQuery.ajax({
      url: `/books.json${ objectToParams(params) }`
    }).then(({ list, total }) => ({
      total,
      books: list.map(bookData => Book.parse(bookData)),
    }))
  }

  static getAuthorBooks(authorId) {
    return jQuery.ajax({
      url: `/books.json${ objectToParams({ 'author_id': authorId }) }`
    }).then(books => books.map(bookData => Book.parse(bookData)))
  }

  static getBook(id) {
    return jQuery.ajax({
      url: `/books/${id}.json`
    }).then(data => Book.parse(data))
  }

  static syncBookStats(id) {
    return jQuery.ajax({
      url: `/books/${id}/sync_goodreads_stats.json`,
      type: 'PUT'
    }).then(data => Book.parse(data))
  }

  static getBookDetails(id) {
    return jQuery.ajax({
      url: `/books/${id}/details.json`
    }).then(data => BookDetails.parse(data))
  }

  static putBookDetails(id, details) {
    const body = BookDetails.objectToServerData(details)
    const formData = new FormData()
    Object.keys(body).forEach(key => formData.append(`book[${key}]`, body[key]))
    return jQuery.ajax({
      url: `/books/${id}/details.json`,
      type: 'PUT',
      data: { book: body },
      // contentType: false, cache: false, processData: false
    })
  }

  static postBookDetails(details) {
    const body = BookDetails.objectToServerData(details)
    return jQuery.ajax({
      url: '/books/details.json',
      type: 'POST',
      data: { book: body }
    })
  }

  static postTagsForBooksBatch(ids, tagNames) {
    return jQuery.ajax({
      url: '/books_batch/assign_tags.json',
      type: 'POST',
      data: {
        'book_ids': ids,
        'tag_names': tagNames,
      }
    })
  }

  static getTags() {
    return jQuery.ajax({
      url: '/tags.json'
    }).then(tags => tags.map(data => Tag.parse(data)))
  }
}

export default ApiClient
