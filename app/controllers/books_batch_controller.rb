class BooksBatchController < ApplicationController
  include Forms::Taggable

  def assign_tags
    tags = map_names_onto_tags(params[:tag_names])
    Book.where(id: params[:book_ids]).find_each do |book|
      book.tags |= tags
    end
    render json: {}
  end
end
