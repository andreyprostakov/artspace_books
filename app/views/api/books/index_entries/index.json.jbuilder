# frozen_string_literal: true

json.list do
  json.partial! 'api/books/index_entries/book', collection: @books, as: :book
end
json.total @count
