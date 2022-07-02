# frozen_string_literal: true

json.array! @entries do |search_entry|
  json.tag_id search_entry.tag_id
  json.highlight search_entry.highlight
end
