# frozen_string_literal: true

class BooksController < ApplicationController
  PERMITTED_ATTRIBUTES = %i[
    title year_published original_title image_url wiki_url goodreads_url
  ].freeze

  before_action :set_book, only: %i[show sync_goodreads_stats]

  def index
    @books = Book.preload(:tag_connections)
    @books = apply_year_filter(@books)
    @books = apply_author_filter(@books)
    @books = apply_tag_filter(@books)
    @books = apply_sort(@books)
    @count = @books.count
    @books = paginate(@books)
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
    params.fetch(:book, {}).permit(*PERMITTED_ATTRIBUTES)
  end

  def apply_sort(books_scope)
    case params[:sort_by]
    when 'name' then books_scope.order(:title)
    when 'year' then books_scope.order(year_published: :desc)
    when 'popularity' then books_scope.order(popularity: :desc)
    else books_scope
    end
  end

  def apply_year_filter(books_scope)
    params[:years].present? ? books_scope.where(year_published: params[:years]) : books_scope
  end

  def apply_author_filter(books_scope)
    params[:author_id].present? ? books_scope.where(author_id: params[:author_id]) : books_scope
  end

  def apply_tag_filter(books_scope)
    params[:tag_id].present? ? books_scope.with_tags(params[:tag_id]) : books_scope
  end

  def paginate(books_scope)
    books_scope.page(params.fetch(:page, 1)).per(params.fetch(:per_page, 100))
  end
end
