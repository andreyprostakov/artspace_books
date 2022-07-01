module Api
  module Books
    class SearchController < Api::Authors::BaseController
      def show
        @entries = Search::BooksSearcher.search(params[:key])
      end
    end
  end
end
