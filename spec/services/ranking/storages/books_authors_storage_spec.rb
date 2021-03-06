# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Ranking::Storages::BooksAuthorsStorage do
  describe '.update' do
    subject { described_class.update(book) }

    let(:book) { build_stubbed(:book, author_id: 15, popularity: 150) }

    before do
      allow(book).to receive(:author_id_previously_changed?).and_return(false)
      allow(book).to receive(:author_id_previously_was).and_return(nil)
    end

    it 'writes given book popularity into the set' do
      expect { subject }.to change { Rails.redis.zscore('books_authors_ranking_15', book.id) }.from(nil).to(150)
    end

    context 'when book was registered before with a different author' do
      before do
        described_class.update(book)
        book.author_id = 16
        allow(book).to receive(:author_id_previously_changed?).and_return(true)
        allow(book).to receive(:author_id_previously_was).and_return(15)
      end

      it 'deletes the old score' do
        expect { subject }.to change { Rails.redis.zscore('books_authors_ranking_15', book.id) }.from(150).to(nil)
      end
    end
  end

  describe '.rank' do
    subject { described_class.rank(book) }

    let(:book) { build_stubbed(:book, author_id: 15, popularity: 150) }

    context 'when the book has not been registered before' do
      it { is_expected.to be_nil }
    end

    context 'when the book has been registered' do
      before { described_class.update(book) }

      context 'when another book has been registered' do
        before { described_class.update(another_book) }

        let(:another_book) { build_stubbed(:book, author_id: 15, popularity: 151) }

        context 'with greater popularity' do
          it 'returns a lesser rank' do
            expect(subject).to eq(2)
          end
        end

        context 'for a different author' do
          let(:another_book) { build_stubbed(:book, author_id: 17, popularity: 151) }

          it 'ignores it' do
            expect(subject).to eq(1)
          end
        end

        context 'with lesser popularity' do
          let(:another_book) { build_stubbed(:book, author_id: 17, popularity: 149) }

          it 'returns top rank' do
            expect(subject).to eq(1)
          end
        end
      end
    end
  end
end
