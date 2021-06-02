require 'rails_helper'

RSpec.describe BookForm do
  let(:form) { described_class.new(book) }
  let(:book) { build(:book) }

  describe '#update' do
    subject { form.update(book_params) }

    let(:book_params) { { title: 'NEW_TITLE' } }

    it 'persists given changed and returns true' do
      expect { subject }.to change(book, :title).to('NEW_TITLE')
      expect(subject).to be true
    end

    context 'when params include tag_names' do
      let(:book_params) { { tag_names: %w[TAG_A TAG_B TAG_C] } }
      let(:preexisting_tags) do
        [
          create(:tag, name: 'TAG_A'),
          create(:tag, name: 'TAG_B'),
          create(:tag, name: 'TAG_D')
        ]
      end

      before { book.tags = preexisting_tags.values_at(0, 2) }

      it 'keeps tags that were assigned before' do
        subject

        expect(book.tags).to include(preexisting_tags[0])
      end

      it 'assigns tags that weren\'t assigned before' do
        subject

        expect(book.tags).to include(preexisting_tags[1])
      end

      it 'unassignes tags that are not present' do
        subject

        expect(book.tags).not_to include(preexisting_tags[2])
      end

      it 'creates and assigns tags that were not registered before' do
        expect { subject }.to change(Tag, :count).by(1)

        new_tag = Tag.last
        expect(new_tag.name).to eq('TAG_C')
        expect(book.tags).to include(new_tag)
      end

      context 'when validation fails' do
        let(:book_params) { super().merge(title: '') }

        it 'reverts all changes to Tag repo', :aggregate_failures do
          expect { subject }.not_to change(Tag, :count)
          expect(subject).to be false
        end
      end
    end
  end
end
