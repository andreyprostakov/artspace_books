class AddOriginalTitleToBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :original_title, :string
  end
end
