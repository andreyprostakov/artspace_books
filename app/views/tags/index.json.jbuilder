json.array! @tags do |tag|
  json.id tag.id
  json.name tag.name
  json.connections_count tag.tag_connections.count
end