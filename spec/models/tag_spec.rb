require 'rails_helper'

RSpec.describe Tag do
  describe 'validation' do
    subject { build(:tag) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name).case_insensitive }

    describe 'of name format' do
      it { is_expected.to allow_value('ABCDEabcde12345-').for(:name) }
      it { is_expected.not_to allow_value('A B').for(:name).with_message('is invalid') }
    end

    it 'has a valid factory' do
      expect(build(:tag)).to be_valid
    end
  end

  context 'before validation' do
    it 'strips the title' do
      tag = described_class.new(name: "   NAME  \n")
      expect { tag.valid? }.to change(tag, :name).to('NAME')
    end
  end
end
