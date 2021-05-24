class BooksListsController < ApplicationController
  before_action :set_book, only: %i[show]

  private

  def set_book
    @book = Book.find(params[:id])
  end
end
