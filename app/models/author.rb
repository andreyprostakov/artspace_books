# == Schema Information
#
# Table name: authors
#
#  id         :integer          not null, primary key
#  fullname   :string           not null
#  reference  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Author < ApplicationRecord
end
