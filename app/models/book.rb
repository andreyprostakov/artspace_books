# == Schema Information
#
# Table name: books
#
#  id             :integer          not null, primary key
#  goodreads_url  :string
#  image_url      :string
#  original_title :string
#  title          :string           not null
#  wiki_url       :string
#  year_published :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  author_id      :integer          not null
#
# Indexes
#
#  index_books_on_author_id       (author_id)
#  index_books_on_year_published  (year_published)
#
class Book < ApplicationRecord
  belongs_to :author, class_name: 'Author'
  has_many :tag_connections, class_name: 'TagConnection', as: :entity
  has_many :tags, through: :tag_connections, class_name: 'Tag'

  validates :title, presence: true
  validates :author_id, presence: true
  validates :year_published, presence: true, numericality: { only_integer: true, greater_than: 0 }

  def tag_ids
    tag_connections.map(&:tag_id)
  end
end
