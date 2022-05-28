# frozen_string_literal: true

module Ranking
  module Storages
    class BooksGlobalStorage
      KEY = 'books_global_ranking'

      class << self
        def update(book)
          redis.zadd(KEY, book.popularity, book.id)
        end

        def rank(book)
          redis.zrevrank(KEY, book.id)&.next
        end

        private

        def redis
          Rails.redis
        end
      end
    end
  end
end
