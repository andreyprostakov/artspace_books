class YearsController < ApplicationController
  def index
    books = Book.all
    books = books.where(author_id: params[:author_id]) if params[:author_id].present?
    books = books.with_tags(params[:tag_id]) if params[:tag_id].present?
    years = books.pluck(:year_published).uniq.sort
    render json: years
  end
end
