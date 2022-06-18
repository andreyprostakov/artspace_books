module ApiRequestsHelper
  def json_response
    symbolize_response_hashes(JSON.parse(response.body))
  end

  private

  def symbolize_response_hashes(value)
    case value
    when Hash then value.deep_symbolize_keys!
    when Array then value.each { |v| symbolize_response_hashes(v) }
    else value
    end
  end
end
