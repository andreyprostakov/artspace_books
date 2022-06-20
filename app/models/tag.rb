# frozen_string_literal: true

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
  has_many :tag_connections, class_name: 'TagConnection', dependent: :destroy
  has_many :book_tag_connections, -> { where(entity_type: Book.name) }, class_name: 'TagConnection'
  has_many :author_tag_connections, -> { where(entity_type: Author.name) }, class_name: 'TagConnection'

  enum category: {
    other: 0,
    format: 1,
    genre: 2,
    location: 3,
    series: 4,
    award: 5,
    theme: 6
  }

  before_validation :strip_name

  validates :name, presence: true, uniqueness: { case_sensitive: false },
                   format: { with: /\A[\w\d-]+\z/, message: 'allows only alphanums and dashes' }

  protected

  def strip_name
    return if name.blank?

    name.strip!
  end
end
