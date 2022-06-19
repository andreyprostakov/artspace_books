# frozen_string_literal: true

json.array! @tags do |tag|
  json.id tag.id
  json.name tag.name
  json.category tag.category
  json.connections_count tag.book_tag_connections.size
end
