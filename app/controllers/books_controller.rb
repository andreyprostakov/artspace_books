class BooksController < ApplicationController
  before_action :set_book, only: %i[show]

  def index
    @books = Book.where(year_published: params[:years])
    @books = @books.where(author_id: params[:author_id]) if params[:author_id].present?
  end

  private

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.fetch(:book, {}).permit(:title, :year_published, :original_title, :image_url, :wiki_url, :goodreads_url)
  end
end
