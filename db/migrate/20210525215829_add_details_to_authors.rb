class AddDetailsToAuthors < ActiveRecord::Migration[6.1]
  def change
    add_column :authors, :image_url, :string
    add_column :authors, :wiki_url, :string
    add_column :authors, :birth_year, :integer
    add_column :authors, :death_year, :integer
  end
end
