# frozen_string_literal: true

module CarrierwaveUrlAssign
  protected

  def assign_remote_url_or_data(attribute, url_or_data)
    return if url_or_data.blank?

    if url_or_data =~ /^data:image/
      public_send("#{attribute}=", url_or_data)
    else
      public_send("remote_#{attribute}_url=", url_or_data)
    end
  end
end
