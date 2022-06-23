class AddCategoryToTags < ActiveRecord::Migration[6.1]
  def change
    add_column :tags, :category, :integer, default: 0
    add_index :tags, :category
  end
end
