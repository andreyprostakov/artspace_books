# frozen_string_literal: true

module Ranking
  module Storages
    class BooksAuthorsStorage < Ranking::Storages::BooksGroupRankStorage
      class << self
        private

        def current_group(book)
          book.author_id
        end

        def previous_group(book)
          book.author_id_previously_was
        end

        def key(ref)
          "books_authors_ranking_#{ref}"
        end
      end
    end
  end
end
