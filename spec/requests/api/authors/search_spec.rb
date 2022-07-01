require 'rails_helper'

RSpec.describe '/api/authors/search', type: :request do
  let(:author) { build_stubbed(:author) }

  describe 'GET /' do
    subject(:send_request) { get '/api/authors/search.json', params: params, headers: authorization_header }

    let(:params) { { key: 'SEARCH_KEY' } }
    let(:author_search_entry) { Search::AuthorsSearcher::Entry.new(author.id, author.fullname) }

    before { allow(Search::AuthorsSearcher).to receive(:search).with('SEARCH_KEY').and_return([author_search_entry]) }

    it 'returns found matches' do
      send_request
      expect(response).to be_successful
      expect(json_response).to eq([{ author_id: author.id, label: author.fullname }])
    end
  end
end
