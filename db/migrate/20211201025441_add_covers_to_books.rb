class AddCoversToBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :covers, :json
  end
end
