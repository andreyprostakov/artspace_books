module Api
  module Authors
    class FullEntriesController < ApplicationController
      before_action :fetch_author, only: %i[show update destroy]

      protect_from_forgery with: :null_session

      def show; end

      def create
        @author = Author.new
        if form.update(author_params)
          render json: { id: @author.id }
        else
          render json: { errors: @author.errors }, status: :unprocessable_entity
        end
      end

      def update
        if form.update(author_params)
          render json: {}
        else
          render json: { errors: @author.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        @author.destroy
        render json: {}
      end

      private

      def fetch_author
        @author = Author.find(params[:id])
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
  end
end
