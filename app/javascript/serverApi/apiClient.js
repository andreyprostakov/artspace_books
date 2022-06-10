import { objectToParams } from 'utils/objectToParams'
import Author from 'serverApi/Author'
import AuthorDetails from 'serverApi/AuthorDetails'
import Book from 'serverApi/Book'
import BookDetails from 'serverApi/BookDetails'
import Tag from 'serverApi/Tag'
import $ from 'jquery'

class ApiClient {
  getYears({ tagId } = {}) {
    return $.ajax({
      url: `/years.json${ objectToParams({ tag_id: tagId }) }`
    })
  }

  getAuthorYears(authorId) {
    return $.ajax({
      url: `/years.json${ objectToParams({ author_id: authorId }) }`
    })
  }

  getAuthors() {
    return $.ajax({
      url: '/authors.json'
    }).then(authors => authors.map(data => Author.parse(data)))
  }

  getAuthor(id) {
    return $.ajax({
      url: `/authors/${id}.json`
    }).then(data => Author.parse(data))
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

  getBooks({ years, authorId, tagId, page, perPage, sortBy }) {
    return $.ajax({
      url: `/books.json${ objectToParams({ years, author_id: authorId, tag_id: tagId, page, per_page: perPage, sort_by: sortBy }) }`
    }).then(({ list, total }) => ({ books: list.map(bookData => Book.parse(bookData)), total }))
  }

  getAuthorBooks(authorId) {
    return $.ajax({
      url: `/books.json${ objectToParams({ author_id: authorId }) }`
    }).then((books) => books.map(bookData => Book.parse(bookData)))
  }

  getBook(id) {
    return $.ajax({
      url: `/books/${id}.json`
    }).then((data) => Book.parse(data))
  }

  syncBookStats(id) {
    return $.ajax({
      url: `/books/${id}/sync_goodreads_stats.json`,
      type: 'PUT'
    }).then((data) => Book.parse(data))
  }

  getBookDetails(id) {
    return $.ajax({
      url: `/books/${id}/details.json`
    }).then((data) => BookDetails.parse(data))
  }

  putBookDetails(id, details) {
    const body = BookDetails.objectToServerData(details)
    console.log(body)
    var formData = new FormData()
    Object.keys(body).forEach(key => formData.append(`book[${key}]`, body[key]))
    console.log(formData)
    return $.ajax({
      url: `/books/${id}/details.json`,
      type: 'PUT',
      data: { book: body },
      //contentType: false, cache: false, processData: false
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

  postTagsForBooksBatch(ids, tagNames) {
    return $.ajax({
      url: '/books_batch/assign_tags.json',
      type: 'POST',
      data: { book_ids: ids, tag_names: tagNames }
    })
  }

  getTags() {
    return $.ajax({
      url: '/tags.json'
    }).then(tags => tags.map(data => Tag.parse(data)))
  }
}

export default new ApiClient()
