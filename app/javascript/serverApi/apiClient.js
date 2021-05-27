import { isArray } from 'lodash'
import AuthorDetails from 'serverApi/AuthorDetails'
import Book from 'serverApi/Book'
import BookDetails from 'serverApi/BookDetails'

class ApiClient {
  getYears(query = {}) {
    return $.ajax({ url: `/years.json?${objectToParams(query)}`})
  }

  getAuthors() {
    return $.ajax({ url: '/authors.json '})
  }

  getAuthorDetails(id) {
    return $.ajax({
      url: `/authors/${id}/details.json`
    }).then((data) => AuthorDetails.parse(data))
  }

  putAuthorDetails(id, details) {
    const body = {
      fullname: details.fullname,
      image_url: details.imageUrl,
      wiki_url: details.wikiUrl,
      birth_year: details.birthYear,
      death_year: details.deathYear
    }
    return $.ajax({
      url: `/authors/${id}/details.json`,
      type: 'PUT',
      data: { author: body }
    })
  }

  getBooks(query = {}) {
    return $.ajax({
      url: `/books.json?${objectToParams(query)}`
    }).then((books) =>
      books.map(bookData => Book.parse(bookData))
    )
  }

  getBook(id) {
    return $.ajax({
      url: `/books/list/${id}.json`
    }).then((data) => Book.parse(data))
  }

  getBookDetails(id) {
    return $.ajax({
      url: `/books/${id}.json`
    }).then((data) => BookDetails.parse(data))
  }

  putBookDetails(id, details) {
    const {
      title,
      originalTitle: original_title,
      goodreadsUrl: goodreads_url,
      wikiUrl: wiki_url,
      imageUrl: image_url,
      authorId: author_id,
      yearPublished: year_published
    } = details
    const body = {
      title, original_title, goodreads_url, wiki_url, image_url, author_id, year_published
    }
    return $.ajax({
      url: `/books/${id}.json`,
      type: 'PUT',
      data: { book: body }
    })
  }
}

const objectToParams = (object) => {
  var params = new URLSearchParams()
  Object.keys(object).forEach(key => {
    const value = object[key]
    if (isArray(value)) {
      value.forEach(entry => params.append(`${key}[]`, entry))
    } else if (value) {
      params.append(key, value)
    }
  })
  return params.toString()
}

export default new ApiClient()
