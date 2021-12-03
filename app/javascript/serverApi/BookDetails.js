class BookDetails {
  static parse(data) {
    return {
      ...data,
      originalTitle: data.original_title,
      goodreadsUrl: data.goodreads_url,
      wikiUrl: data.wiki_url,
      imageUrl: data.cover_thumb_url,
      imageFile: null,
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
      cover_thumb_url: details.imageUrl,
      cover_file: details.imageFile,
      author_id: details.authorId,
      year_published: details.yearPublished,
      tag_names: details.tagNames,
    }
  }
}

export default BookDetails
