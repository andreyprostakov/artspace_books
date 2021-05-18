class BooksController < ApplicationController
  before_action :set_book, only: %i[ show edit update destroy ]

  helper_method :return_destination

  # GET /books or /books.json
  def index
    years_to_load = fetch_years_navigation
    @books = Book.preload(:author).order(year_published: :desc, title: :asc).where(year_published: years_to_load)
    session[:last_books_filter] = request.url
  end

  # GET /books/new
  def new
    @book = Book.new
  end

  # GET /books/1/edit
  def edit
  end

  # POST /books or /books.json
  def create
    @book = Book.new(book_params)

    respond_to do |format|
      if @book.save
        format.html { redirect_to return_destination, notice: "Book was successfully created." }
        format.json { render :show, status: :created, location: @book }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /books/1 or /books/1.json
  def update
    respond_to do |format|
      if @book.update(book_params)
        format.html { redirect_to return_destination, notice: "Book was successfully updated." }
        format.json { render :show, status: :ok, location: @book }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /books/1 or /books/1.json
  def destroy
    @book.destroy
    respond_to do |format|
      format.html { redirect_to return_destination, notice: "Book was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def fetch_years_navigation
    years = Book.order(year_published: :asc).pluck(:year_published).uniq
    @years = years

    if params[:year] && (year = params[:year].to_i).in?(years)
      @current_year = year
    else
      @current_year = years.last
    end

    year_index = years.index(@current_year)
    [
      (years[year_index - 1] if year_index >= 1),
      @current_year,
      years[year_index + 1]
    ].compact
  end

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.fetch(:book, {}).permit(:title, :year_published, :original_title, :image_url, :wiki_url, :goodreads_url)
  end

  def return_destination
    session[:last_books_filter] || books_path
  end
end
