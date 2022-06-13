# frozen_string_literal: true

json.id author.id
json.fullname author.fullname
json.books_count counts_by_author.fetch(author.id, 0)
