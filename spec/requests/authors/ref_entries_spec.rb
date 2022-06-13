require 'rails_helper'

RSpec.describe '/authors/ref_entries', type: :request do
  let(:author) { create(:author) }

  before { author.books << build(:book, author: nil) }

  describe 'GET /:id' do
    subject(:send_request) { get "/authors/ref_entries/#{author.id}.json", headers: authorization_header }

    it 'returns most basic info' do
      send_request
      expect(response).to be_successful
      expect(response.body).to eq({
        id: author.id,
        fullname: author.fullname,
        books_count: 1
      }.to_json)
    end
  end

  describe 'GET /' do
    subject(:send_request) { get '/authors/ref_entries.json', headers: authorization_header }

    it 'returns list' do
      send_request
      expect(response).to be_successful
      expect(response.body).to eq([{
        id: author.id,
        fullname: author.fullname,
        books_count: 1
      }].to_json)
    end
  end
end
