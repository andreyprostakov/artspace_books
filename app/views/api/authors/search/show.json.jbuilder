# frozen_string_literal: true

json.array! @entries do |search_entry|
  json.author_id search_entry.author_id
  json.label search_entry.match_html
end
