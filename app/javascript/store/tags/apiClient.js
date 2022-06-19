import TagIndexEntry from 'store/tags/api/TagIndexEntry'
import TagRef from 'store/tags/api/TagRef'

const jQuery = window.$

class ApiClient {
  static getTagsIndex() {
    return jQuery.ajax({
      url: '/api/tags/index_entries.json'
    }).then(list => list.map(entry => TagIndexEntry.parse(entry)))
  }

  static getTagsRefs() {
    return jQuery.ajax({
      url: '/api/tags/ref_entries.json'
    }).then(list => list.map(entry => TagRef.parse(entry)))
  }
}

export default ApiClient
