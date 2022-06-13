# frozen_string_literal: true

module Api
  class TagsController < ApplicationController
    def index
      @tags = Tag.preload(:tag_connections)
    end
  end
end
