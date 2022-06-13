module Api
  module Authors
    class RefEntriesController < ApplicationController
      def index
        @authors = Author.all
      end

      def show
        @author = Author.find(params[:id])
      end
    end
  end
end
