FactoryBot.define do
  factory :tag, class: 'Tag' do
    sequence(:name) { |i| "Tag #{i}" }
  end
end
