# frozen_string_literal: true

module Ranking
  module Storages
    # Upsert/read book's popularity for ranking purposes per SOME GROUP CRITERION
    class BooksGroupRankStorage
      class << self
        def update(book)
          old_ref = previous_group(book)
          new_ref = current_group(book)
          redis.zrem(key(old_ref), book.id) if old_ref.present? && old_ref != new_ref
          redis.zadd(key(new_ref), book.popularity, book.id)
        end

        def rank(book)
          redis.zrevrank(key(current_group(book)), book.id)&.next
        end

        private

        def current_group(book)
          raise NotImplementedError
        end

        def previous_group(book)
          raise NotImplementedError
        end

        def key(ref)
          "#{self::KEY}_#{ref}"
        end

        def redis
          Rails.redis
        end
      end
    end
  end
end
