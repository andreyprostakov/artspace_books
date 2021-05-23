class YearsController < ApplicationController
  def index
    years = Book.pluck(:year_published).uniq.sort
    render json: years
  end
end
