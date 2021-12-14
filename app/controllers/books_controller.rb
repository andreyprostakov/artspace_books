class BooksController < ApplicationController
  before_action :set_book, only: %i[show sync_goodreads_stats]

  def index
    @books = Book.preload(:tag_connections)
    @books = @books.where(year_published: params[:years]) if params[:years].present?
    @books = @books.where(author_id: params[:author_id]) if params[:author_id].present?
    @books = @books.with_tags(params[:tag_id]) if params[:tag_id].present?
  end

  def sync_goodreads_stats
    GoodreadsStatsUpdater.new.update(@book)
    render :show
  end

  private

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.fetch(:book, {}).permit(:title, :year_published, :original_title, :image_url, :wiki_url, :goodreads_url)
  end
end
