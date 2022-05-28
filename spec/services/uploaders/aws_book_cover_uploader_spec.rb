# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Uploaders::AwsBookCoverUploader do
  describe '.storage' do
    it { expect(described_class.storage).to eq(CarrierWave::Storage::Fog) }
  end

  describe '.processors' do
    it { expect(described_class.processors).to include([:resize_to_limit, [600, 800], anything]) }
  end

  describe '.versions' do
    it { expect(described_class.versions).to include(:thumb) }
  end

  describe '#store_dir' do
    subject { uploader.store_dir }

    let(:uploader) { described_class.new(book) }
    let(:book) { build_stubbed(:book, id: 111) }

    it { is_expected.to eq('test/book-covers/111') }
  end
end
