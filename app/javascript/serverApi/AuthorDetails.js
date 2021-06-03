class AuthorDetails {
  static serverDataToObject(data) {
    return {
      ...data,
      imageUrl: data.image_url,
      birthYear: data.birth_year,
      deathYear: data.death_year,
      tagIds: data.tag_ids
    }
  }

  static objectToServerData(details) {
    return {
      fullname: details.fullname,
      image_url: details.imageUrl,
      reference: details.reference,
      birth_year: details.birthYear,
      death_year: details.deathYear
    }
  }
}

export default AuthorDetails
