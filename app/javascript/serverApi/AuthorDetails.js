class AuthorDetails {
  static parse(data) {
    return {
      ...data,
      imageUrl: data.image_url,
      wikiUrl: data.wiki_url,
      birthYear: data.birth_year,
      deathYear: data.death_year
    }
  }
}

export default AuthorDetails
