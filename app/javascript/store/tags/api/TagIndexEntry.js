class TagRef {
  static parse(data) {
    return {
      id: data['id'],
      name: data['name'],
      category: data['category'],
      bookConnectionsCount: data['book_connections_count'],
      authorConnectionsCount: data['author_connections_count'],
    }
  }
}

export default TagRef
