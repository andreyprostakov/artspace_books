FactoryBot.define do
  factory :author, class: 'Author' do
    sequence(:fullname) { |i| "King Henry #{i}" }
  end
end
