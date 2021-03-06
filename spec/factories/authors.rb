# frozen_string_literal: true

# == Schema Information
#
# Table name: authors
#
#  id         :integer          not null, primary key
#  aws_photos :json
#  birth_year :integer
#  death_year :integer
#  fullname   :string           not null
#  reference  :string
#  wiki_url   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :author, class: 'Author' do
    sequence(:fullname) { |i| "King Henry #{i}" }
  end
end
