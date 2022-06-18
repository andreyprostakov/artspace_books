# frozen_string_literal: true

module Api
  module Books
    class BatchController < Api::Books::BaseController
      def update
        books = Book.where(id: params[:ids])
        perform_form_update(Forms::BooksBatchForm.new(books), batch_params)
      end

      private

      def batch_params
        params.fetch(:batch_update).permit(tag_names: [])
      end
    end
  end
end
