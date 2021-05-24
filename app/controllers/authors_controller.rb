class AuthorsController < ApplicationController
  before_action :set_author, only: %i[ show edit update destroy ]

  def index
    @authors = Author.all
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
    respond_to do |format|
      if @author.update(author_params)
        format.json { render :show, status: :ok, location: @author }
      else
        format.json { render json: @author.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @author.destroy
    head :no_content
  end

  private

  def set_author
    @author = Author.find(params[:id])
  end

  def author_params
    params.fetch(:author, {})
  end
end
