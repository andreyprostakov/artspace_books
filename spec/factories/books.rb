FactoryBot.define do
  factory :book, class: 'Book' do
    sequence(:title) { |i| "Book #{i}" }
    association(:author, factory: :author, strategy: :create)
    year_published { 1992 + rand(0..29) }
  end
end
