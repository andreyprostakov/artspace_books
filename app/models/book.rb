# == Schema Information
#
# Table name: books
#
#  id                   :integer          not null, primary key
#  aws_covers           :json
#  covers               :json
#  goodreads_popularity :integer
#  goodreads_rating     :float
#  goodreads_url        :string
#  image_url            :string
#  original_title       :string
#  popularity           :integer          default(0)
#  title                :string           not null
#  wiki_url             :string
#  year_published       :integer          not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  author_id            :integer          not null
#
# Indexes
#
#  index_books_on_author_id       (author_id)
#  index_books_on_year_published  (year_published)
#
class Book < ApplicationRecord
  belongs_to :author, class_name: 'Author', required: false
  has_many :tag_connections, class_name: 'TagConnection', as: :entity, dependent: :destroy
  has_many :tags, through: :tag_connections, class_name: 'Tag'

  mount_base64_uploader :covers, BookCoverUploader
  mount_base64_uploader :aws_covers, AwsBookCoverUploader

  validates :title, presence: true, uniqueness: { scope: :author_id }
  validates :author_id, presence: true
  validates :year_published, presence: true, numericality: { only_integer: true, greater_than: 0 }

  before_validation :strip_title
  before_validation :calculate_popularity
  after_commit :update_ranking

  scope :with_tags, lambda { |tag_ids|
    includes(:tags).references(:tags).where('tags.id IN (?)', Array(tag_ids))
  }

  def tag_ids
    tag_connections.map(&:tag_id)
  end

  def cover_thumb_url
    aws_covers.url(:thumb) || covers.url(:thumb) || image_url
  end

  def cover_thumb_url=(value)
    return if value.blank?

    if value =~ /^data:image/
      self.aws_covers = value
    else
      self.remote_aws_covers_url = value
    end
  end

  protected

  def strip_title
    return if title.blank?

    title.strip!
  end

  def calculate_popularity
    return if [goodreads_rating, goodreads_popularity].any?(&:blank?)

    self.popularity = (goodreads_rating * goodreads_popularity).floor
  end

  def update_ranking
    return unless saved_change_to_attribute?(:popularity)

    Ranking::BooksRanker.update(self)
  end
end
