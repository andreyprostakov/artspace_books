# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GoodreadsStatsScraper do
  let(:scraper) { described_class.new }

  describe '#extract_stats' do
    subject { scraper.extract_stats(book) }

    let(:book) { build_stubbed(:book, goodreads_url: 'https://www.goodreads.com/book/show/2452383.The_Chimes') }

    xit 'fetches data from HTML page' do
      expect(subject).to match(
        rating: kind_of(Float),
        popularity: kind_of(Integer)
      )
    end
  end
end
