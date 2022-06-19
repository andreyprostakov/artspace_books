# frozen_string_literal: true

module Api
  module Tags
    class IndexEntriesController < Api::BaseController
      def index
        @tags = Tag.preload(:tag_connections)
      end
    end
  end
end
