# frozen_string_literal: true

json.array! @entries do |search_entry|
  json.book_id search_entry.book_id
  json.label search_entry.match_html
end
