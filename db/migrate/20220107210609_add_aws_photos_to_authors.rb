class AddAwsPhotosToAuthors < ActiveRecord::Migration[6.1]
  def change
    add_column :authors, :aws_photos, :json
  end
end
