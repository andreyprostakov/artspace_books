# frozen_string_literal: true

module Api
  module Books
    class BatchController < Api::Books::BaseController
      def update
        books = Book.where(id: params[:ids])
        if form(books).update(batch_params)
          render json: {}
        else
          invalid = books.find { |b| b.errors.present? }
          render json: invalid.errors, status: :unprocessable_entity
        end
      end

      private

      def form(books)
        Forms::BooksBatchForm.new(books)
      end

      def batch_params
        params.fetch(:batch_update).permit(tag_names: [])
      end
    end
  end
end
