# frozen_string_literal: true

class GoodreadsStatsUpdater
  def self.update(book)
    if book.goodreads_url.blank?
      book.errors.add(:goodreads_url, 'should be present')
      return false
    end

    info = GoodreadsStatsScraper.extract_stats(book)
    book.goodreads_rating = info[:rating] if info[:rating]
    book.goodreads_popularity = info[:popularity] if info[:popularity]
    book.save
  # rescue Errno::ECONNREFUSED, Errno::ETIMEDOUT
  #   false
  end
end
