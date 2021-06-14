class Tag {
  static parse(data) {
    return {
      ...data,
      connectionsCount: data.connections_count
    }
  }
}

export default Tag
