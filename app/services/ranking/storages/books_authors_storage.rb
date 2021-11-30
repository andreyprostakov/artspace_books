module Ranking
  module Storages
    class BooksAuthorsStorage
      KEY = 'books_authors_ranking'.freeze

      class << self
        def update(book)
          author_id = book.author_id
          if book.author_id_previously_changed? && author_id != book.author_id_previously_was
            redis.zrem(key(book.author_id_previously_was), book.id)
          end
          redis.zadd(key(book.author_id), book.popularity, book.id)
        end

        def rank(book)
          redis.zrevrank(key(book.author_id), book.id)&.next
        end

        private

        def key(author_id)
          "#{KEY}_#{author_id}"
        end

        def redis
          Rails.redis
        end
      end
    end
  end
end
