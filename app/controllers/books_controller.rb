class BooksController < ApplicationController
  before_action :set_book, only: %i[ show edit update destroy ]

  protect_from_forgery with: :null_session

  helper_method :return_destination

  def index
    @books = Book.preload(:author).order(year_published: :desc, title: :asc).where(year_published: params[:years])
    @books = @books.where(author_id: params[:author_id]) if params[:author_id].present?
  end

  def create
    @book = Book.new(book_params)
    if @book.save
      render json: {}
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  def update
    if @book.update(book_params)
      render json: {}
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @book.destroy
    head :no_content
  end

  private

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.fetch(:book, {}).permit(:title, :year_published, :original_title, :image_url, :wiki_url, :goodreads_url)
  end
end
