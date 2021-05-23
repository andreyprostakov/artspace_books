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
require "test_helper"

class BookTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
