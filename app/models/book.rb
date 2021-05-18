class Book < ApplicationRecord
  belongs_to :author

  def url
    goodreads_url.presence || wiki_url
  end
end
