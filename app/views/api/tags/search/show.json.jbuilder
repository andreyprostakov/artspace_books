# frozen_string_literal: true

json.array! @entries do |search_entry|
  json.tag_id search_entry.tag_id
  json.label search_entry.match_html
end
