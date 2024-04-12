# frozen_string_literal: true

class GoodreadsStatsScraper
  RATING_PATTERN = /<div class="RatingStatistics__rating"[\s\w\-\=\"]*>([\d\.]+).*<\/div>/
  COUNT_PATTERN = /<span data-testid="ratingsCount"[\s\w\-\=\"]*>([\d\,]+).*<\/span>/

  def self.extract_stats(book)
    return {} unless book.goodreads_url

    site_page_content = HTTParty.get(book.goodreads_url).body
    (rating,), = site_page_content.scan(RATING_PATTERN)
    (ratings_count,), = site_page_content.scan(COUNT_PATTERN)
    {
      rating: rating&.to_f,
      ratings_count: ratings_count&.gsub(',', '')&.to_i
    }
  end
end
