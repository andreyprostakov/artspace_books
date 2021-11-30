require 'fog/aws'

CarrierWave.configure do |config|
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: 'XXX',
    aws_secret_access_key: 'XXX',
    region: 'us-east-2'
  }
  config.fog_directory  = 'infospace-books-app'
  config.fog_public = false
end
