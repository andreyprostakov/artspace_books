module Search
  class AuthorsSearcher < Search::BaseSearcher
    LIMIT = 7

    private

    def search_solr(key)
      Author.search do
        fulltext key_to_fuzzy_key(key) do
          highlight :fullname
        end
        paginate per_page: LIMIT
      end
    end

    def format_results(search_result)
      search_result.hits.map do |hit|
        Entry.new(
          hit.result.id,
          hit.highlights(:fullname).first.format
        )
      end
    end

    class Entry
      attr_reader :author_id, :match_html

      def initialize(id, match_html)
        @author_id = id
        @match_html = match_html
      end
    end
  end
end
