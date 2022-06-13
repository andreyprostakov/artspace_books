module Api
  module Authors
    class IndexEntriesController < Api::Authors::BaseController
      def index
        @authors = Author.all
      end

      def show
        fetch_author
      end
    end
  end
end
