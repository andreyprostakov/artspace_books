require 'rails_helper'

RSpec.describe Author do
  it { is_expected.to have_many(:books).class_name(Book.name) }

  describe 'validation' do
    subject { build(:author) }

    it { is_expected.to validate_presence_of(:fullname) }
    it { is_expected.to validate_uniqueness_of(:fullname) }
    it { is_expected.to validate_numericality_of(:birth_year).only_integer }
    it { is_expected.to validate_numericality_of(:death_year).only_integer }

    it 'has a valid factory' do
      expect(build(:author)).to be_valid
    end
  end

  context 'before validation' do
    it 'strips the fullname' do
      author = described_class.new(fullname: "   NAME  \n")
      expect { author.valid? }.to change(author, :fullname).to('NAME')
    end
  end
end
