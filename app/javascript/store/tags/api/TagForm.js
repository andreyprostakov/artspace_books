class TagForm {
  static buildServerData(formData) {
    return {
      'name': formData.name,
    }
  }
}

export default TagForm
