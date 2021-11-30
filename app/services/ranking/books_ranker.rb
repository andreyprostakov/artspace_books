class Ranking::BooksRanker
  class << self
    def update(book)
      Ranking::Storages::BooksGlobalStorage.update(book)
      Ranking::Storages::BooksYearsStorage.update(book)
      Ranking::Storages::BooksAuthorsStorage.update(book)
      Ranking::Storages::AuthorsStorage.update(book)
    end

    def rank_global(book)
      Ranking::Storages::BooksGlobalStorage.rank(book)
    end

    def rank_by_year(book)
      Ranking::Storages::BooksYearsStorage.rank(book)
    end

    def rank_by_author(book)
      Ranking::Storages::BooksAuthorsStorage.rank(book)
    end

    def rank_author(author)
      Ranking::Storages::AuthorsStorage.rank(author)
    end
  end
end
