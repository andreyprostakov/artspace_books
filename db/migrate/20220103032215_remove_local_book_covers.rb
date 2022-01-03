class RemoveLocalBookCovers < ActiveRecord::Migration[6.1]
  def change
    remove_column :books, :covers, :json
  end
end
