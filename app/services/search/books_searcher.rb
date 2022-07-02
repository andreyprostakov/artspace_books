module Search
  class BooksSearcher < Search::BaseSearcher
    LIMIT = 30

    private

    def search_solr(key)
      Book.search do
        fulltext key_to_fuzzy_key(key) do
          highlight :title
        end
        paginate per_page: LIMIT
      end
    end

    def format_results(search_result)
      search_result.hits.map do |hit|
        Entry.new(hit.result, hit.highlights(:title).first.format)
      end
    end

    class Entry
      attr_reader :book_id, :title, :year, :author_id, :highlight

      def initialize(book, highlight)
        @book_id = book.id
        @title = book.title
        @year = book.year_published
        @author_id = book.author_id
        @highlight = highlight
      end
    end
  end
end
