module ApiRequestsHelper
  def json_response
    symbolize_response_hashes(JSON.parse(response.body))
  end

  private

  def symbolize_response_hashes(value)
    if value.is_a?(Hash)
      value.deep_symbolize_keys!
    elsif value.is_a?(Array)
      value.each { |v| symbolize_response_hashes(v) }
    else
      value
    end
  end
end
