require 'redis'

class << Rails
  def redis
    @redis ||= connect_redis
  end

  private

  def connect_redis
    config = Rails.application.config_for(:redis)
    Redis.new(config)
  end
end
