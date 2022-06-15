require 'rails_helper'

RSpec.describe '/api/books/popularity' do
  describe 'PUT /:id' do
    subject(:send_request) { put "/api/books/popularity/#{book.id}.json", headers: authorization_header }

    let(:book) { create(:book, popularity: 4000, goodreads_url: 'https://example.com') }

    before do
      allow(GoodreadsStatsScraper).to receive(:extract_stats).with(book).and_return(rating: 4.3, popularity: 1000)
    end

    it 'calls updater and returns book info' do
      send_request

      expect(response).to be_successful
      expect(json_response).to match(hash_including(id: book.id, popularity: 4300))
    end

    context 'when updater fails' do
      before { book.update!(goodreads_url: nil) }

      it 'returns an error' do
        send_request

        expect(response).to be_unprocessable
        expect(json_response).to match(errors: { goodreads_url: ['should be present'] })
      end
    end
  end
end
