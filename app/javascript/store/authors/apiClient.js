import AuthorForm from 'store/authors/api/AuthorForm'
import AuthorFull from 'store/authors/api/AuthorFull'
import AuthorIndexEntry from 'store/authors/api/AuthorIndexEntry'
import AuthorRef from 'store/authors/api/AuthorRef'

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

  static getAuthorsIndex() {
    return jQuery.ajax({
      url: '/api/authors/index_entries.json'
    }).then(authors => authors.map(data => AuthorIndexEntry.parse(data)))
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
}

export default ApiClient
