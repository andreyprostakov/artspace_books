module Ranking
  module Storages
    class AuthorsStorage
      KEY = 'authors_ranking'.freeze

      class << self
        def update(book)
          if book.author_id_previously_changed? && book.author_id_previously_was
            previous_author = Author.find(book.author_id_previously_was)
            redis.zadd(KEY, previous_author.popularity, previous_author.id)
          end
          redis.zadd(KEY, book.author.popularity, book.author.id)
        end

        def rank(author)
          redis.zrevrank(KEY, author.id)&.next
        end

        private

        def redis
          Rails.redis
        end
      end
    end
  end
end
