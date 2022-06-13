module AuthHelper
  def authorization_header
    credentials = ActionController::HttpAuthentication::Basic.encode_credentials(
      ENV.fetch('ADMIN_USERNAME'), ENV.fetch('ADMIN_PASSWORD')
    )
    { 'HTTP_AUTHORIZATION' => credentials }
  end
end
