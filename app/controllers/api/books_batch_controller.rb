# frozen_string_literal: true

module Api
  class BooksBatchController < ApplicationController
    def assign_tags
      tags = map_names_onto_tags(params[:tag_names])
      Book.where(id: params[:book_ids]).find_each do |book|
        book.tags |= tags
      end
      render json: {}
    end

    private

    def map_names_onto_tags(names)
      names = names.reject(&:blank?)
      existing_tags = Tag.where(name: names)
      non_existent_tags = (names - existing_tags.map(&:name)).map { |name| Tag.new(name: name) }
      existing_tags + non_existent_tags
    end
  end
end
