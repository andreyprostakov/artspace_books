import { objectToParams } from 'utils/objectToParams'
import Book from 'serverApi/Book'
import BookDetails from 'serverApi/BookDetails'

const jQuery = window.$

class ApiClient {
  static getYears({ authorId, tagIds } = {}) {
    const query = {
      'author_id': authorId,
      'tag_ids': tagIds,
    }
    return jQuery.ajax({
      url: `/api/books/years.json${ objectToParams(query) }`
    })
  }

  static getBooks({ years, authorId, tagId, tagIds, page, perPage, sortBy } = {}) {
    const params = {
      years,
      page,
      'author_id': authorId,
      'tag_id': tagId,
      'tag_ids': tagIds,
      'per_page': perPage,
      'sort_by': sortBy
    }
    return jQuery.ajax({
      url: `/api/books/index_entries.json${ objectToParams(params) }`
    }).then(({ list, total }) => ({
      total,
      books: list.map(bookData => Book.parse(bookData)),
    }))
  }

  static getAuthorBooks(authorId) {
    return jQuery.ajax({
      url: `/api/books/index_entries.json${ objectToParams({ 'author_id': authorId }) }`
    }).then(books => books.map(bookData => Book.parse(bookData)))
  }

  static getBook(id) {
    return jQuery.ajax({
      url: `/api/books/index_entries/${id}.json`
    }).then(data => Book.parse(data))
  }

  static syncBookStats(id) {
    return jQuery.ajax({
      url: `/api/books/popularity/${id}.json`,
      type: 'PUT'
    }).then(data => Book.parse(data))
  }

  static getBookDetails(id) {
    return jQuery.ajax({
      url: `/api/books/full_entries/${id}.json`
    }).then(data => BookDetails.parse(data))
  }

  static putBookDetails(id, details) {
    const body = BookDetails.objectToServerData(details)
    const formData = new FormData()
    Object.keys(body).forEach(key => formData.append(`book[${key}]`, body[key]))
    return jQuery.ajax({
      url: `/api/books/full_entries/${id}.json`,
      type: 'PUT',
      data: { book: body },
      // contentType: false, cache: false, processData: false
    })
  }

  static postBookDetails(details) {
    const body = BookDetails.objectToServerData(details)
    return jQuery.ajax({
      url: '/api/books/full_entries.json',
      type: 'POST',
      data: { book: body }
    })
  }

  static postTagsForBooksBatch(ids, tagNames) {
    return jQuery.ajax({
      url: '/api/books/batch.json',
      type: 'PUT',
      data: {
        ids,
        'batch_update': {
          'tag_names': tagNames,
        },
      }
    })
  }
}

export default ApiClient
