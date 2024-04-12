# frozen_string_literal: true

require "rails_helper"

RSpec.describe GoodreadsStatsUpdater do
  describe ".update" do
    subject(:call) { described_class.update(book) }

    let(:book) { create(:book, goodreads_url: "example.com", goodreads_rating: 2.5, goodreads_popularity: 1000) }

    let(:scrapped_info) { {rating: 2.9, ratings_count: 2000} }

    before do
      allow(GoodreadsStatsScraper).to receive(:extract_stats).with(book).and_return(scrapped_info)
    end

    it "fetches & applies updated stats" do
      call
      book.reload
      expect(book.goodreads_rating).to eq(2.9)
      expect(book.goodreads_popularity).to eq(2000)
      expect(book.popularity).to eq(5800)
    end

    it "returns Result object" do
      expect(call).to be_a(described_class::Results)
      aggregate_failures do
        expect(call).to be_success
        expect(call.rating_change).to eq(0.4)
        expect(call.ratings_count_change).to eq(1000)
        expect(call.popularity_change).to eq(3300)
      end
    end

    context "when the Book had no stats before" do
      let(:book) { create(:book, goodreads_url: "example.com", goodreads_rating: nil, goodreads_popularity: nil) }

      it "fetches & applies updated stats" do
        call
        book.reload
        expect(book.goodreads_rating).to eq(2.9)
        expect(book.goodreads_popularity).to eq(2000)
        expect(book.popularity).to eq(5800)
      end
  
      it "returns Result object" do
        expect(call).to be_a(described_class::Results)
        aggregate_failures do
          expect(call).to be_success
          expect(call.rating_change).to eq(2.9)
          expect(call.ratings_count_change).to eq(2000)
          expect(call.popularity_change).to eq(5800)
        end
      end

      context "when stats could not be scrapped" do
        let(:scrapped_info) { {} }
  
        it "does not update stats" do
          call
          book.reload
          expect(book.goodreads_rating).to be_nil
          expect(book.goodreads_popularity).to be_nil
          expect(book.popularity).to eq(0)
        end
    
        it "returns Result object" do
          expect(call).to be_a(described_class::Results)
          aggregate_failures do
            expect(call).not_to be_success
            expect(call.rating_change).to eq(0)
            expect(call.ratings_count_change).to eq(0)
            expect(call.popularity_change).to eq(0)
          end
        end
      end
    end

    context "when stats could not be scrapped" do
      let(:scrapped_info) { {} }

      it "does not update stats" do
        call
        book.reload
        expect(book.goodreads_rating).to eq(2.5)
        expect(book.goodreads_popularity).to eq(1000)
        expect(book.popularity).to eq(2500)
      end
  
      it "returns Result object" do
        expect(call).to be_a(described_class::Results)
        aggregate_failures do
          expect(call).not_to be_success
          expect(call.rating_change).to eq(0)
          expect(call.ratings_count_change).to eq(0)
          expect(call.popularity_change).to eq(0)
        end
      end
    end
  end
end
