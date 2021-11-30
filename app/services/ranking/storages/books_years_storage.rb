module Ranking
  module Storages
    class BooksYearsStorage
      KEY = 'books_years_ranking'.freeze

      class << self
        def update(book)
          year = book.year_published
          if book.year_published_previously_changed? && year != book.year_published_previously_was
            redis.zrem(key(book.year_published_previously_was), book.id)
          end
          redis.zadd(key(book.year_published), book.popularity, book.id)
        end

        def rank(book)
          redis.zrevrank(key(book.year_published), book.id)&.next
        end

        private

        def key(year)
          "#{KEY}_#{year}"
        end

        def redis
          Rails.redis
        end
      end
    end
  end
end
