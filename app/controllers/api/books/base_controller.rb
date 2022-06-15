module Api
  module Books
    class BaseController < ApplicationController
      private

      def fetch_book
        @book = Book.find(params[:id])
      end
    end
  end
end
