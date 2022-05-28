require 'rails_helper'

RSpec.describe Uploaders::AwsAuthorPhotoUploader do
  describe '.storage' do
    it { expect(described_class.storage).to eq(CarrierWave::Storage::Fog) }
  end

  describe '.processors' do
    it { expect(described_class.processors).to include([:resize_to_limit, [1000, 600], anything]) }
  end

  describe '.versions' do
    it { expect(described_class.versions).to include(:thumb, :card) }
  end

  describe '#store_dir' do
    subject { uploader.store_dir }

    let(:uploader) { described_class.new(author) }
    let(:author) { build_stubbed(:author, id: 111) }

    it { is_expected.to eq('test/author-photos/111') }
  end
end
