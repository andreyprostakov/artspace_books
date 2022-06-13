# frozen_string_literal: true

module Api
  module Tags
    class RefEntriesController < ApplicationController
      def index
        @tags = Tag.preload(:tag_connections)
      end
    end
  end
end
