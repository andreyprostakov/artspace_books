# frozen_string_literal: true

json.id book.id
json.title book.title
json.goodreads_url book.goodreads_url
json.cover_thumb_url book.cover_thumb_url
json.cover_full_url book.cover_url
json.author_id book.author_id
json.year book.year_published
json.tag_ids book.tag_ids
json.popularity book.popularity
json.global_rank Ranking::BooksRanker.rank_global(book)
