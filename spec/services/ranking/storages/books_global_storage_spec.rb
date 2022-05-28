# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Ranking::Storages::BooksGlobalStorage do
  describe '.update' do
    subject { described_class.update(book) }

    let(:book) { build_stubbed(:book, popularity: 150) }

    it 'writes given book popularity into the set' do
      expect { subject }.to change { Rails.redis.zscore(described_class::KEY, book.id) }.from(nil).to(150)
    end

    context 'when book was registered before with a different popularity' do
      before do
        described_class.update(book)
        book.popularity = 160
      end

      it 'overrides it with a new score' do
        expect { subject }.to change { Rails.redis.zscore(described_class::KEY, book.id) }.from(150).to(160)
      end
    end
  end

  describe '.rank' do
    subject { described_class.rank(book) }

    let(:book) { build_stubbed(:book, popularity: 150) }

    context 'when the book has not been registered before' do
      it { is_expected.to be_nil }
    end

    context 'when the book has been registered' do
      before { described_class.update(book) }

      context 'when a book with greater popularity has been registered' do
        before { described_class.update(build_stubbed(:book, popularity: 151)) }

        it 'returns a lesser rank' do
          expect(subject).to eq(2)
        end
      end

      context 'when a book with lesser popularity has been registered' do
        before { described_class.update(build_stubbed(:book, popularity: 149)) }

        it 'returns top rank' do
          expect(subject).to eq(1)
        end
      end
    end
  end
end
