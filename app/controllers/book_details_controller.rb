class BookDetailsController < ApplicationController
  before_action :set_book, only: %i[show update]

  protect_from_forgery with: :null_session

  def show
  end

  def create
    @book = Book.new(book_params)
    if @book.save
      render json: { id: @book.id }
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

  private

  def set_book
    @book = Book.find(params[:book_id])
  end

  def book_params
    params.fetch(:book, {}).permit(:title, :year_published, :original_title, :image_url, :wiki_url, :goodreads_url, :author_id)
  end
end
