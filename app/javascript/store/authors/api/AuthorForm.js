class AuthorForm {
  static buildServerData(formData) {
    return {
      'fullname': formData.fullname,
      'photo_url': formData.imageUrl,
      'reference': formData.reference,
      'birth_year': formData.birthYear,
      'death_year': formData.deathYear,
      'tag_names': formData.tagNames,
    }
  }
}

export default AuthorForm
