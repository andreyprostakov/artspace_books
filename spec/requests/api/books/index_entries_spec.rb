require 'rails_helper'

RSpec.describe '/api/books/index_entries' do
  describe 'GET /:id' do
    subject(:send_request) { get "/api/books/index_entries/#{book.id}.json", headers: authorization_header }

    let(:book) do
      create(:book, goodreads_url: 'https://example.com', year_published: 2000, popularity: 20_000, tags: [tag])
    end
    let(:tag) { create(:tag) }

    before do
      allow(Ranking::BooksRanker).to receive(:rank_global).with(book).and_return(14)
    end

    it 'returns book info' do
      send_request

      expect(response).to be_successful
      expect(response.body).to eq({
        id: book.id,
        title: book.title,
        goodreads_url: 'https://example.com',
        cover_thumb_url: nil,
        cover_full_url: nil,
        author_id: book.author_id,
        year: 2000,
        tag_ids: [tag.id],
        popularity: 20_000,
        global_rank: 14
      }.to_json)
    end
  end

  describe 'GET /' do
    subject(:send_request) { get '/api/books/index_entries.json', headers: authorization_header }

    let(:book) { create(:book) }

    before { book }

    it 'returns books page and their total number' do
      send_request

      expect(response).to be_successful
      expect(json_response).to match(list: [hash_including(id: book.id)], total: 1)
    end
  end
end
