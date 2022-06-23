require 'rails_helper'

RSpec.describe '/api/books/batch' do
  describe 'PUT /' do
    subject(:send_request) { put '/api/books/batch.json', params: params, headers: authorization_header }

    let(:params) do
      {
        ids: books.map(&:id),
        batch_update: {
          tag_names: ['TAG_A']
        }
      }
    end
    let(:books) { create_list(:book, 3) }

    it 'applies update to each record of the batch' do
      send_request

      expect(response).to be_successful
      expect(json_response).to eq({})
      books.each do |book|
        expect(book.reload.tags.map(&:name)).to eq %w[TAG_A]
      end
    end

    context 'when updates are invalid' do
      let(:params) { super().deep_merge(batch_update: { tag_names: ['TAG A'] }) }

      it 'renders errors' do
        send_request

        expect(response).to be_unprocessable
        expect(json_response).to eq(errors: { tags: ['name allows only alphanums and dashes'] })
      end
    end
  end
end
