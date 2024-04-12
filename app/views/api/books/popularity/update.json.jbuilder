# frozen_string_literal: true

json.book json.partial!('api/books/index_entries/book', book: @book)
json.popularity_change @book.current_popularity_change
