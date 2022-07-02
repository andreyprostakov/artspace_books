module Search
  class BooksSearcher < Search::BaseSearcher
    LIMIT = 30

    private

    def search_solr(key)
      search_solr_parameterized(key, Book, :title, limit: LIMIT)
    end

    class Entry
      attr_reader :book_id, :title, :year, :author_id, :highlight

      def initialize(hit)
        book = hit.result
        @book_id = book.id
        @title = book.title
        @year = book.year_published
        @author_id = book.author_id
        @highlight = hit.highlights(:title).first.format { |word| "*#{word}*" }
      end
    end
  end
end
