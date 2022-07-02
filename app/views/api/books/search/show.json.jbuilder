# frozen_string_literal: true

json.array! @entries do |search_entry|
  json.book_id search_entry.book_id
  json.title search_entry.title
  json.year search_entry.year
  json.author_id search_entry.author_id
  json.highlight search_entry.highlight
end
