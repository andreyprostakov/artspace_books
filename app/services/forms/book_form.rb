class Forms::BookForm
  def initialize(book)
    @book = book
  end

  def update(book_params)
    Book.transaction do
      book.update(normalize_book_params(book_params)).tap do |success|
        raise ActiveRecord::Rollback unless success
      end
    end || false
  end

  protected

  attr_reader :book

  def normalize_book_params(params)
    safe_params = params.except(:tag_names)
    if params.has_key?(:tag_names)
      safe_params[:tags] = map_names_onto_tags(params[:tag_names])
    end
    safe_params
  end

  def map_names_onto_tags(names)
    existing_tags = Tag.where(name: names)
    non_existent_tags = (names - existing_tags.map(&:name)).map { |name| Tag.new(name: name) }
    existing_tags + non_existent_tags
  end
end
