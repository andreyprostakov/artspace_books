# frozen_string_literal: true

module Uploaders
  class AwsAuthorPhotoUploader < CarrierWave::Uploader::Base
    include CarrierWave::MiniMagick

    storage :fog

    process resize_to_limit: [1000, 600]

    version :thumb do
      process resize_to_fill: [160, 160]
    end

    version :card do
      process resize_to_limit: [320, 320]
    end

    def store_dir
      "#{Rails.env}/author-photos/#{model.id}"
    end
  end
end
