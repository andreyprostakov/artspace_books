counts_by_author = Book.group(:author_id).count
json.partial! 'authors/author', collection: @authors, as: :author, counts_by_author: counts_by_author
