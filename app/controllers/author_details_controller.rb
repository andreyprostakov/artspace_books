class AuthorDetailsController < ApplicationController
  before_action :set_author, only: %i[show update]

  protect_from_forgery with: :null_session

  def show
  end

  def create
    @author = Author.new(author_params)

    respond_to do |format|
      if @author.save
        format.json { render :show, status: :created, location: @author }
      else
        format.json { render json: @author.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    if @author.update(author_params)
      render json: {}
    else
      render json: @author.errors, status: :unprocessable_entity
    end
  end

  private

  def set_author
    @author = Author.find(params[:author_id])
  end

  def author_params
    params.fetch(:author, {}).permit(:fullname, :image_url, :wiki_url, :birth_year, :death_year)
  end
end
