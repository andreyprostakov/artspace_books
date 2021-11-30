class AddGoodreadsStatsToBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :goodreads_rating, :float
    add_column :books, :goodreads_popularity, :integer
  end
end
