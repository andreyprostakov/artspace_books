require 'rails_helper'

RSpec.describe '/api/tags/full_entries' do
  describe 'PUT /:id' do
    subject(:send_request) do
      put "/api/tags/full_entries/#{tag.id}.json", params: { tag: tag_params }, headers: authorization_header
    end

    let(:tag) { create(:tag, name: 'OLD_NAME') }
    let(:tag_params) { { name: 'NEW_NAME' } }

    it 'updates the tag' do
      send_request

      expect(response).to be_successful
      expect(json_response).to be_empty
      expect(tag.reload.name).to eq('NEW_NAME')
    end

    context 'when updates are invalid' do
      let(:tag_params) { { name: 'NEW NAME' } }

      it 'shows the errors' do
        send_request

        expect(response).to be_unprocessable
        expect(json_response).to eq(
          errors: { name: ['allows only alphanums and dashes'] }
        )
        expect(tag.reload.name).to eq('OLD_NAME')
      end
    end
  end

  describe 'DELETE /:id' do
    subject(:send_request) do
      delete "/api/tags/full_entries/#{tag.id}.json", headers: authorization_header
    end

    let(:tag) { create(:tag, name: 'OLD_NAME') }

    it 'deletes the tag' do
      tag
      expect { send_request }.to change(Tag, :count).by(-1)

      expect(response).to be_successful
      expect(json_response).to be_empty
    end
  end
end
