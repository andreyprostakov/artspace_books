class TagsController < ApplicationController
  def index
    @tags = Tag.preload(:tag_connections)
  end
end
