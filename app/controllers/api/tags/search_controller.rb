module Api
  module Tags
    class SearchController < Api::Tags::BaseController
      def show
        @entries = Search::TagsSearcher.search(params[:key])
      end
    end
  end
end
