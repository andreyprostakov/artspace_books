class BookDetails {
  static parse(data) {
    return {
      ...data,
      originalTitle: data.original_title,
      goodreadsUrl: data.goodreads_url,
      wikiUrl: data.wiki_url,
      imageUrl: data.image_url,
      authorId: data.author_id,
      yearPublished: data.year_published,
      tagIds: data.tag_ids
    }
  }

  static objectToServerData(details) {
    return {
      title: details.title,
      original_title: details.originalTitle,
      goodreads_url: details.goodreadsUrl,
      wiki_url: details.wikiUrl,
      image_url: details.imageUrl,
      author_id: details.authorId,
      year_published: details.yearPublished,
      tags: details.tags,
    }
  }
}

export default BookDetails
