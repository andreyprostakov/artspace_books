# frozen_string_literal: true

module Api
  class YearsController < ApplicationController
    def index
      books = Book.all
      books = apply_author_filter(books)
      books = apply_tag_filter(books)
      years = books.pluck(:year_published).uniq.sort
      render json: years
    end

    private

    def apply_author_filter(books_scope)
      params[:author_id].present? ? books_scope.where(author_id: params[:author_id]) : books_scope
    end

    def apply_tag_filter(books_scope)
      ids = Array.wrap(params[:tag_id]).presence || params[:tag_ids]
      return books_scope if ids.blank?

      books_scope.with_tags(ids)
    end
  end
end
