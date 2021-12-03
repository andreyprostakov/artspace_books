# == Schema Information
#
# Table name: books
#
#  id                   :integer          not null, primary key
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
FactoryBot.define do
  factory :book, class: 'Book' do
    sequence(:title) { |i| "Book #{i}" }
    association(:author, factory: :author, strategy: :create)
    year_published { 1992 + rand(0..29) }
  end
end
