module Api
  module Authors
    class SearchController < Api::Authors::BaseController
      def show
        @entries = Search::AuthorsSearcher.search(params[:key])
      end
    end
  end
end
