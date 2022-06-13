# frozen_string_literal: true

author = @author
json.id author.id
json.fullname author.fullname
json.photo_card_url author.photo_card_url
json.photo_full_url author.photo_url
json.reference author.reference
json.birth_year author.birth_year
json.death_year author.death_year
json.tag_ids author.tag_ids
json.books_count author.books.count
json.popularity author.popularity
json.rank Ranking::BooksRanker.rank_author(author)
