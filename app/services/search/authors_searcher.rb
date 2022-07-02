module Search
  class AuthorsSearcher < Search::BaseSearcher
    LIMIT = 7

    private

    def search_solr(key)
      search_solr_parameterized(key, Author, :fullname, limit: LIMIT)
    end

    class Entry
      attr_reader :author_id, :highlight

      def initialize(hit)
        @author_id = hit.result.id
        @highlight = hit.highlights(:fullname).first.format { |word| "*#{word}*" }
      end
    end
  end
end
