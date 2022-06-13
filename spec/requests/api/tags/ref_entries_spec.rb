require 'rails_helper'

RSpec.describe '/api/tags/ref_entries', type: :request do
  let(:tag) { create(:tag) }

  before { create(:tag_connection, tag: tag, entity: build(:book)) }

  describe 'GET /' do
    subject(:send_request) { get '/api/tags/ref_entries.json', headers: authorization_header }

    it 'returns list' do
      send_request
      expect(response).to be_successful
      expect(response.body).to eq([{
        id: tag.id,
        name: tag.name,
        connections_count: 1
      }].to_json)
    end
  end
end
