require 'rails_helper'

RSpec.describe '/api/books/search', type: :request do
  let(:book) { build_stubbed(:book) }

  describe 'GET /' do
    subject(:send_request) { get '/api/books/search.json', params: params, headers: authorization_header }

    let(:params) { { key: 'SEARCH_KEY' } }
    let(:search_entry) { Search::BooksSearcher::Entry.new(book.id, book.title) }

    before { allow(Search::BooksSearcher).to receive(:search).with('SEARCH_KEY').and_return([search_entry]) }

    it 'returns found matches' do
      send_request
      expect(response).to be_successful
      expect(json_response).to eq([{ book_id: book.id, label: book.title }])
    end
  end
end
