module BooksHelper
  def book_cover_image_url(book)
    book.image_url || image_url('book-cover-placeholder.png')
  end
end
