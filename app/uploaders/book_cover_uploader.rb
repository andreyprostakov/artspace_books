class BookCoverUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :fog

  # process resize_to_fill: [100, 100]

  version :thumb do
    #process resize_to_fill: [130, 200]
  end

  def store_dir
    "books/covers/#{model.id}"
  end
end
