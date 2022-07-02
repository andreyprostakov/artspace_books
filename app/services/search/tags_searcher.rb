module Search
  class TagsSearcher < Search::BaseSearcher
    LIMIT = 7

    private

    def search_solr(key)
      search_solr_parameterized(key, Tag, :name, limit: LIMIT)
    end

    class Entry
      attr_reader :tag_id, :highlight

      def initialize(hit)
        @tag_id = hit.result.id
        @highlight = hit.highlights(:name).first.format { |word| "*#{word}*" }.gsub(' ', '')
      end
    end
  end
end
