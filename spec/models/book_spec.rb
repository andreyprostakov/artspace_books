# frozen_string_literal: true

# == Schema Information
#
# Table name: books
#
#  id                   :integer          not null, primary key
#  aws_covers           :json
#  goodreads_popularity :integer
#  goodreads_rating     :float
#  goodreads_url        :string
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
  it { is_expected.to belong_to(:author).class_name(Author.name).required(false) }
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
    describe '#title' do
      it 'is stripped' do
        book = build_stubbed(:book, title: "   TITLE  \n")
        expect { book.valid? }.to change(book, :title).to('TITLE')
      end
    end

    describe '#popularity' do
      let(:book) { build_stubbed(:book, goodreads_rating: 5.0, goodreads_popularity: 100) }

      it 'is filled' do
        expect { book.valid? }.to change(book, :popularity).from(0).to(5 * 100)
      end

      context 'without goodreads_rating' do
        before { book.goodreads_rating = nil }

        it 'does not change' do
          expect { book.valid? }.not_to change(book, :popularity).from(0)
        end
      end

      context 'without goodreads_popularity' do
        before { book.goodreads_popularity = nil }

        it 'does not change' do
          expect { book.valid? }.not_to change(book, :popularity).from(0)
        end
      end
    end
  end

  context 'after commit' do
    describe 'ranking' do
      let(:book) { create(:book, popularity: 100) }

      before { book }

      it 'updates ranking storages' do
        expect(Ranking::BooksRanker).to receive(:update).with(book)

        book.update!(popularity: 200)
      end

      context 'when popularity does not change' do
        it 'does not update ranking' do
          expect(Ranking::BooksRanker).not_to receive(:update)

          book.save!
        end
      end
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
