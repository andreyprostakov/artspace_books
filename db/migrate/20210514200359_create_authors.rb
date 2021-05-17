class CreateAuthors < ActiveRecord::Migration[6.1]
  def change
    create_table :authors do |t|
      t.string :fullname, null: false
      t.string :reference

      t.timestamps
    end
  end
end
