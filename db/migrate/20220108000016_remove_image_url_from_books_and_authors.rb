class RemoveImageUrlFromBooksAndAuthors < ActiveRecord::Migration[6.1]
  def change
    remove_column :books, :image_url, :string
    remove_column :authors, :image_url, :string
  end
end
