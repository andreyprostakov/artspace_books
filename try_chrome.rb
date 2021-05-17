require 'capybara'
require 'selenium-webdriver'

Capybara.register_driver :chrome do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.register_driver :headless_chrome do |app|
  capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
    chromeOptions: {
      args: %w[
        headless
        disable-gpu
        no-sandbox
        disable-dev-shm-usage
        enable-features=NetworkService,NetworkServiceInProcess
        remote-debugging-port=9222
        no-first-run
        use-fake-ui-for-media-stream
        use-fake-device-for-media-stream
      ]
    }
  )

  Capybara::Selenium::Driver.new app,
    browser: :remote,
    url: 'http://172.20.80.1:4444/wd/hub',
    desired_capabilities: capabilities
end

Capybara.default_driver = :headless_chrome
Capybara.current_driver = :headless_chrome
Capybara.javascript_driver = :headless_chrome

Capybara.current_session.visit 'https://www.imaginarycloud.com/blog/from-capybara-webkit-to-headless-chrome-and-chromedriver/'



require 'selenium-webdriver'
def setup
  @driver = Selenium::WebDriver.for(:remote, :url => 'http://localhost:4444/wd/hub', :desired_capabilities => :chrome)
  #@driver = Selenium::WebDriver.for :chrome
  @base_url = "http://www.google.com/"
  @driver.manage.timeouts.implicit_wait = 30
  @verification_errors = []
end
setup
@driver.get "https://google.com"
