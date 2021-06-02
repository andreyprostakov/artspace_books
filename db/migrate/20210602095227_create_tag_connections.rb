class CreateTagConnections < ActiveRecord::Migration[6.1]
  def change
    create_table :tag_connections do |t|
      t.references :tag, null: false, index: true
      t.references :entity, null: false, index: false
      t.string :entity_type, null: false

      t.timestamps
    end

    add_index :tag_connections, %i[entity_type entity_id tag_id], unique: true
  end
end
