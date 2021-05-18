class SeparateReferenceSourcesInBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :goodreads_url, :string
    rename_column :books, :reference, :wiki_url
  end
end
