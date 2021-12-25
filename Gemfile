source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.2'

gem 'rails', '~> 6.1.3', '>= 6.1.3.2'
gem 'sqlite3', '~> 1.4'
gem 'puma', '~> 5.0'
gem 'sass-rails', '>= 6'
gem 'webpacker', '~> 5.0'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.7'
# Use Active Storage variant
# gem 'image_processing', '~> 1.2'
gem 'bootsnap', '>= 1.4.4', require: false

gem 'slim'
gem 'wikipedia-client'
gem 'httparty'
gem 'bootstrap', '~> 5.0.1'
gem 'annotate'
gem 'foreman'
gem 'react-rails'
gem 'carrierwave'
gem 'carrierwave-base64'
gem 'fog-aws'
gem 'redis'

group :development, :test do
  gem 'pry-rails'
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'web-console', '>= 4.1.0'
  gem 'listen', '~> 3.3'
  gem 'spring'
  gem 'capistrano', require: false
  gem 'capistrano-rails', require: false
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver', '< 3.141.0'
  gem 'rspec-rails', '~> 5.0.0'
  gem 'factory_bot_rails'
  gem 'shoulda-matchers', '~> 4.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
