# frozen_string_literal: true

json.list do
  json.partial! 'books/book', collection: @books, as: :book
end
json.total @count
