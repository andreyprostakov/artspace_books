module Search
  class BaseSearcher
    def self.search(key)
      new.search(key)
    end

    def search(key)
      search_result = search_solr(key)
      format_results(search_result)
    end

    private

    def search_solr(key)
      raise NotImplementedError
    end

    def search_solr_parameterized(key, model, field)
      model.search do
        fulltext key_to_fuzzy_key(key) do
          highlight field
        end
        paginate per_page: self::LIMIT
      end
    end

    def key_to_fuzzy_key(key)
      key.gsub(/(\w+)/, '*\1* \1~')
    end

    def format_results(search_result)
      search_result.hits.map do |hit|
        self.class::Entry.new(hit)
      end
    end
  end
end
