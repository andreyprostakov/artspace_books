require 'fog/aws'

CarrierWave.configure do |config|
  config.fog_credentials = {
    provider: 'AWS',
    region: 'us-east-2',
    aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
    aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
  }
  config.fog_directory = 'infospace-books-app'
  config.fog_public = false

  Fog::Storage.new(config.fog_credentials).sync_clock
end
