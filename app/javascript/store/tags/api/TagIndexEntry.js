class TagRef {
  static parse(data) {
    return {
      id: data['id'],
      name: data['name'],
      category: data['category'],
      connectionsCount: data['connections_count']
    }
  }
}

export default TagRef
