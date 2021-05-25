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
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Author < ApplicationRecord
  validates :fullname, presence: true, uniqueness: true
  validates :birth_year, numericality: { only_integer: true, allow_nil: true }
  validates :death_year, numericality: { only_integer: true, allow_nil: true }
end
