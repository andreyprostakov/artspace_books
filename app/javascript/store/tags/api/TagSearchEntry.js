class TagSearchEntry {
  static parse(data) {
    return {
      tagId: data['tag_id'],
      highlight: data['highlight'],
    }
  }
}

export default TagSearchEntry
