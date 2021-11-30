# == Schema Information
#
# Table name: books
#
#  id                   :integer          not null, primary key
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
require 'rails_helper'

RSpec.describe Book do
  it { is_expected.to belong_to(:author).class_name(Author.name) }
  it { is_expected.to have_many(:tag_connections).class_name(TagConnection.name) }
  it { is_expected.to have_many(:tags).class_name(Tag.name).through(:tag_connections) }

  describe 'validation' do
    subject { build(:book) }

    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_uniqueness_of(:title).scoped_to(:author_id) }
    it { is_expected.to validate_presence_of(:author_id) }
    it { is_expected.to validate_presence_of(:year_published) }
    it { is_expected.to validate_numericality_of(:year_published).only_integer }

    it 'has a valid factory' do
      expect(build(:book)).to be_valid
    end
  end

  context 'before validation' do
    it 'strips the title' do
      book = described_class.new(title: "   TITLE  \n")
      expect { book.valid? }.to change(book, :title).to('TITLE')
    end
  end

  describe '#tag_ids' do
    subject { book.tag_ids }

    let(:book) { build(:book, tags: tags) }
    let(:tags) { create_list(:tag, 2) }

    it 'returns list of associated IDs' do
      expect(subject).to match_array(tags.map(&:id))
    end
  end
end
