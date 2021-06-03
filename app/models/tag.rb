# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_tags_on_name  (name) UNIQUE
#
class Tag < ApplicationRecord
  has_many :tag_connections, class_name: 'TagConnection', dependent: :restrict_with_error

  before_validation :strip_name

  validates :name, presence: true, uniqueness: { case_sensitive: false }, format: /\A[\w\d-]+\z/

  protected

  def strip_name
    return if name.blank?

    name.strip!
  end
end
