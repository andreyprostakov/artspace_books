# frozen_string_literal: true

class GoodreadsStatsUpdater
  def update(book)
    return false if book.goodreads_url.blank?

    info = GoodreadsStatsScraper.new.extract_stats(book)
    book.goodreads_rating = info[:rating] if info[:rating]
    book.goodreads_popularity = info[:popularity] if info[:popularity]
    book.save
  rescue Errno::ECONNREFUSED, Errno::ETIMEDOUT
    false
  end
end
