import { objectToParams } from 'utils/objectToParams'
import AuthorForm from 'store/authors/api/AuthorForm'
import AuthorFull from 'store/authors/api/AuthorFull'
import AuthorIndexEntry from 'store/authors/api/AuthorIndexEntry'
import AuthorRef from 'store/authors/api/AuthorRef'
import AuthorSearchEntry from 'store/authors/api/AuthorSearchEntry'

const jQuery = window.$

class ApiClient {
  static getAuthorsRefs() {
    return jQuery.ajax({
      url: '/api/authors/ref_entries.json'
    }).then(authors => authors.map(data => AuthorRef.parse(data)))
  }

  static getAuthorRef(id) {
    return jQuery.ajax({
      url: `/api/authors/ref_entries/${id}.json`
    }).then(data => AuthorRef.parse(data))
  }

  static getAuthorsIndex({ page, perPage, sortBy } = {}) {
    const params = {
      page,
      'per_page': perPage,
      'sort_by': sortBy
    }
    return jQuery.ajax({
      url: `/api/authors/index_entries.json${ objectToParams(params) }`
    }).then(({ list, total }) => ({ total, list: list.map(data => AuthorIndexEntry.parse(data)) }))
  }

  static getAuthorIndexEntry(id) {
    return jQuery.ajax({
      url: `/api/authors/index_entries/${id}.json`
    }).then(data => AuthorIndexEntry.parse(data))
  }

  static getAuthorFull(id) {
    return jQuery.ajax({
      url: `/api/authors/full_entries/${id}.json`
    }).then(data => AuthorFull.parse(data))
  }

  static putAuthorUpdates(id, formData) {
    const body = AuthorForm.buildServerData(formData)
    return jQuery.ajax({
      url: `/api/authors/full_entries/${id}.json`,
      type: 'PUT',
      data: { author: body }
    })
  }

  static postNewAuthor(formData) {
    const body = AuthorForm.buildServerData(formData)
    return jQuery.ajax({
      url: '/api/authors/full_entries.json',
      type: 'POST',
      data: { author: body }
    })
  }

  static search(key) {
    return jQuery.ajax({
      url: `/api/authors/search.json${ objectToParams({ key }) }`
    }).then(entries => entries.map(raw => AuthorSearchEntry.parse(raw)))
  }
}

export default ApiClient
