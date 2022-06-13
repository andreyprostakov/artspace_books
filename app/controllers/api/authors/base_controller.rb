module Api
  module Authors
    class BaseController < ApplicationController
      private

      def fetch_author
        @author = Author.find(params[:id])
      end
    end
  end
end
