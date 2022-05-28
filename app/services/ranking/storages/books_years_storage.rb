# frozen_string_literal: true

module Ranking
  module Storages
    class BooksYearsStorage < Ranking::Storages::BooksGroupRankStorage
      class << self
        private

        def current_group(book)
          book.year_published
        end

        def previous_group(book)
          book.year_published_previously_was
        end

        def key(year)
          "books_years_ranking_#{year}"
        end
      end
    end
  end
end
