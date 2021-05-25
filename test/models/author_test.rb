# == Schema Information
#
# Table name: authors
#
#  id         :integer          not null, primary key
#  birth_year :integer
#  death_year :integer
#  fullname   :string           not null
#  image_url  :string
#  reference  :string
#  wiki_url   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class AuthorTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
