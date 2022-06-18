# frozen_string_literal: true

class GoodreadsStatsScraper
  RATING_PATTERN = /&quot;rating&quot;:&quot;([\d.]+)&quot;/
  POPULARITY_PATTERN = /&quot;ratingsCount&quot;:(\d+),&quot;/

  def self.extract_stats(book)
    return {} unless book.goodreads_url

    site_page_content = HTTParty.get(book.goodreads_url).body
    (rating,), = site_page_content.scan(RATING_PATTERN)
    (popularity,), = site_page_content.scan(POPULARITY_PATTERN)
    {
      rating: rating&.to_f,
      popularity: popularity&.to_i
    }
  end
end
