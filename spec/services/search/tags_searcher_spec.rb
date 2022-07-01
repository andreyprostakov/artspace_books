require 'rails_helper'

RSpec.describe Search::TagsSearcher do
  describe '.search' do
    subject { described_class.search(search_key) }

    let(:search_key) { 'foo bar' }
    let(:search_result) { instance_double(Sunspot::Search::StandardSearch, hits: [search_hit]) }
    let(:search_hit) { instance_double(Sunspot::Search::Hit, highlights: [search_highlight], result: tag) }
    let(:search_highlight) { instance_double(Sunspot::Search::Highlight, format: '<em>Foo</em> Baz') }
    let(:tag) { build_stubbed(:tag, name: 'Foo Baz') }

    before do
      allow(Tag).to receive(:search) do
        search_result
      end
    end

    it 'queries Solr and returns formatted hits' do
      expect(subject).to be_a(Array)
      expect(subject.size).to eq(1)
      entry = subject.first
      expect(entry).to be_a(described_class::Entry)
      expect(entry.tag_id).to eq(tag.id)
      expect(entry.match_html).to eq(search_highlight.format)
    end
  end
end
