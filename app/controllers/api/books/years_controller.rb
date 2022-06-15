# frozen_string_literal: true

module Api
  module Books
    class YearsController < Api::Books::BaseController
      def index
        books = BooksFilter.filtered_scope(params)
        years = books.pluck(:year_published).uniq.sort
        render json: years
      end
    end
  end
end
