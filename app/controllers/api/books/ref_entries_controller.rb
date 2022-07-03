# frozen_string_literal: true

module Api
  module Books
    class RefEntriesController < Api::Books::BaseController
      before_action :fetch_book, only: :show

      def index
        @books = BooksFilter.filtered_scope(params)
      end

      def show; end
    end
  end
end
