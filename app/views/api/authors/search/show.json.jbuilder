# frozen_string_literal: true

json.array! @entries do |search_entry|
  json.author_id search_entry.author_id
  json.highlight search_entry.highlight
end
