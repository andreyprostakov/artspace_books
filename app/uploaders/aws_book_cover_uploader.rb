class AwsBookCoverUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :fog

  version :thumb do
    process resize_to_fill: [130, 200]
  end

  def store_dir
    "#{Rails.env}/book-covers/#{model.id}"
  end
end
