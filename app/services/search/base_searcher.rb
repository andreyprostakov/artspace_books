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

    def key_to_fuzzy_key(key)
      key.gsub(/(\w+)/, '*\1* \1~')
    end

    def format_results(search_result)
      raise NotImplementedError
    end
  end
end
