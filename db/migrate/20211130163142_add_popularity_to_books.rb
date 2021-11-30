class AddPopularityToBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :popularity, :integer, default: 0
  end
end
