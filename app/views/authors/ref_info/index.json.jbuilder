# frozen_string_literal: true

counts_by_author = Book.group(:author_id).count
json.partial! 'authors/ref_info/author', collection: @authors, as: :author, counts_by_author: counts_by_author
