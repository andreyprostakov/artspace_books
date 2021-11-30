class GoodreadsStatsScraper
  RATING_PATTERN = /&quot;rating&quot;:&quot;([\d\.]+)&quot;/.freeze
  POPULARITY_PATTERN = /&quot;ratingsCount&quot;:(\d+),&quot;/.freeze

  def extract_stats(book)
    return {} unless book.goodreads_url

    site_page = HTTParty.get(book.goodreads_url)
    (rating,), = site_page.scan(RATING_PATTERN)
    (popularity,), = site_page.scan(POPULARITY_PATTERN)
    {
      rating: (rating.to_f if rating),
      popularity: (popularity.to_i if popularity)
    }
  end
end
