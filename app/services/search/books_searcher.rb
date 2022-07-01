module Search
  class BooksSearcher < Search::BaseSearcher
    LIMIT = 7

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
        Entry.new(
          hit.result.id,
          hit.highlights(:title).first.format
        )
      end
    end

    class Entry
      attr_reader :book_id, :match_html

      def initialize(id, match_html)
        @book_id = id
        @match_html = match_html
      end
    end
  end
end
