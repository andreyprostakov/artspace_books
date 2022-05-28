# frozen_string_literal: true

class AuthorDetailsController < ApplicationController
  before_action :set_author, only: %i[show update]

  protect_from_forgery with: :null_session

  def show; end

  def create
    @author = Author.new
    if form.update(author_params)
      render json: { id: @author.id }
    else
      render json: @author.errors, status: :unprocessable_entity
    end
  end

  def update
    if form.update(author_params)
      render json: {}
    else
      render json: @author.errors, status: :unprocessable_entity
    end
  end

  private

  def set_author
    @author = Author.find(params[:author_id])
  end

  def form
    Forms::AuthorForm.new(@author)
  end

  def author_params
    params.fetch(:author, {})
          .permit(:fullname,
                  :photo_url,
                  :reference,
                  :birth_year,
                  :death_year,
                  tag_names: [])
  end
end
