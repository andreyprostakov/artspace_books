class AddAwsCoversToBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :aws_covers, :json
  end
end
