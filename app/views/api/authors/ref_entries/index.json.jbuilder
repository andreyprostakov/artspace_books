# frozen_string_literal: true

counts_by_author = Book.group(:author_id).count

json.array! @authors do |author|
  json.id author.id
  json.fullname author.fullname
  json.books_count counts_by_author[author.id] || 0
end
