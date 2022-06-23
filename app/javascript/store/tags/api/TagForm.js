class TagForm {
  static buildServerData(formData) {
    return {
      'name': formData.name,
      'category_id': formData.categoryId,
    }
  }
}

export default TagForm
