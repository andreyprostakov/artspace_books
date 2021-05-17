class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.integer :year_published, null: false, index: true
      t.string :reference
      t.integer :author_id, null: false, index: true

      t.timestamps
    end
  end
end
