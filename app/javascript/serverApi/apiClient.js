import { isArray } from 'lodash'
import { Book } from 'serverApi/Book'

class ApiClient {
  getYears() {
    return $.ajax({ url: '/years.json '})
  }

  getAuthors() {
    return $.ajax({ url: '/authors.json '})
  }

  getBooks(query = {}) {
    return $.ajax({
      url: `/books.json?${objectToParams(query)}`
    }).then((books) =>
      books.map(bookData => Book.parse(bookData))
    )
  }
}

const objectToParams = (object) => {
  var params = new URLSearchParams()
  Object.keys(object).forEach(key => {
    const value = object[key]
    if (isArray(value)) {
      value.forEach(entry => params.append(`${key}[]`, entry))
    } else {
      parans.append(key, value)
    }
  })
  return params.toString()
}

export default new ApiClient()
