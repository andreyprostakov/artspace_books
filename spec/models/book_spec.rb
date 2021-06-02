require 'rails_helper'

RSpec.describe Book do
  it { is_expected.to belong_to(:author).class_name(Author.name) }
  it { is_expected.to have_many(:tag_connections).class_name(TagConnection.name) }
  it { is_expected.to have_many(:tags).class_name(Tag.name).through(:tag_connections) }

  describe 'validation' do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:author_id) }
    it { is_expected.to validate_presence_of(:year_published) }
    it { is_expected.to validate_numericality_of(:year_published).only_integer }

    it 'has a valid factory' do
      expect(build(:book)).to be_valid
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
