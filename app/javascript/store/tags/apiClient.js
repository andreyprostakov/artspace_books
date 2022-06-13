import TagRef from 'store/tags/api/TagRef'

const jQuery = window.$

class ApiClient {
  static getTagsRefs() {
    return jQuery.ajax({
      url: '/api/tags/ref_entries.json'
    }).then(tagsRefs => tagsRefs.map(data => TagRef.parse(data)))
  }
}

export default ApiClient
