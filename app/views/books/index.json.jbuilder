json.array! @books do |book|
  json.id book.id
  json.title book.title
  json.url(book.goodreads_url || book.wiki_url)
  json.cover_url book.image_url
  json.author_id book.author_id
  json.year book.year_published
end
