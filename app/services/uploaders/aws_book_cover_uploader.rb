# frozen_string_literal: true

module Uploaders
  class AwsBookCoverUploader < CarrierWave::Uploader::Base
    include CarrierWave::MiniMagick

    storage :fog

    process resize_to_limit: [600, 800]

    version :thumb do
      process resize_to_fill: [160, 240]
    end

    def store_dir
      "#{Rails.env}/book-covers/#{model.id}"
    end
  end
end
