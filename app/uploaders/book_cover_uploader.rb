class BookCoverUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  version :thumb do
    process resize_to_fill: [130, 200]
  end

  def store_dir
    "public/assets/book-covers/#{model.id}"
  end
end
