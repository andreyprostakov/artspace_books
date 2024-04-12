# frozen_string_literal: true

class GoodreadsStatsUpdater
  class Results
    def initialize(book, scrapped_info: {}, success: true)
      @book = book
      @scrapped_info = scrapped_info
      @success = success
    end
  
    def scrapped_rating
      scrapped_info[:rating]
    end
  
    def rating_found?
      scrapped_rating.present?
    end
  
    def rating_changed?
      book.saved_change_to_goodreads_rating?
    end

    def rating_change
      return 0 unless success?

      (book.goodreads_rating - (book.goodreads_rating_before_last_save || 0)).round(2)
    end
  
    def scrapped_ratings_count
      scrapped_info[:ratings_count]
    end
  
    def ratings_count_found?
      scrapped_ratings_count.present?
    end
  
    def ratings_count_changed?
      book.saved_change_to_goodreads_popularity?
    end

    def ratings_count_change
      return 0 unless success?

      book.goodreads_popularity - (book.goodreads_popularity_before_last_save || 0)
    end

    def success?
      @success
    end

    def popularity_change
      return 0 unless success?

      book.popularity - (book.popularity_before_last_save || 0)
    end
  
    private
  
    attr_reader :book, :scrapped_info
  end

  def self.update(book)
    if book.goodreads_url.blank?
      book.errors.add(:goodreads_url, 'should be present')
      return Results.new(book, success: false)
    end

    scrapped_info = GoodreadsStatsScraper.extract_stats(book)
    success = if scrapped_info.empty?
      false
    else
      book.goodreads_rating = scrapped_info[:rating] if scrapped_info[:rating]
      book.goodreads_popularity = scrapped_info[:ratings_count] if scrapped_info[:ratings_count]
      book.save
    end
    Results.new(book, scrapped_info: scrapped_info, success: success)
  end
end
