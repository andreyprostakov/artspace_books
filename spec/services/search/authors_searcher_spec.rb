require 'rails_helper'

RSpec.describe Search::AuthorsSearcher do
  describe '.search' do
    subject { described_class.search(search_key) }

    let(:search_key) { 'foo bar' }
    let(:search_result) { instance_double(Sunspot::Search::StandardSearch, hits: [search_hit]) }
    let(:search_hit) { instance_double(Sunspot::Search::Hit, highlights: [search_highlight], result: author) }
    let(:search_highlight) { instance_double(Sunspot::Search::Highlight, format: '*Foo* Baz') }
    let(:author) { build_stubbed(:author, fullname: 'Foo Baz') }

    before do
      allow(Author).to receive(:search) do
        search_result
      end
    end

    it 'queries Solr and returns formatted hits' do
      expect(subject).to be_a(Array)
      expect(subject.size).to eq(1)
      entry = subject.first
      expect(entry).to be_a(described_class::Entry)
      expect(entry.author_id).to eq(author.id)
      expect(entry.highlight).to eq(search_highlight.format)
    end
  end
end
