# frozen_string_literal: true

module Api
  module Tags
    class FullEntriesController < Api::Tags::BaseController
      PERMITTED_ATTRIBUTES = %i[
        name category_id
      ].freeze

      before_action :fetch_tag, only: %i[update destroy]

      protect_from_forgery with: :null_session

      def update
        perform_form_update(form, tag_params)
      end

      def destroy
        @tag.destroy!
        render json: {}
      end

      private

      def form
        @form ||= Forms::TagForm.new(@tag)
      end

      def fetch_tag
        @tag = Tag.find(params[:id])
      end

      def tag_params
        params.fetch(:tag, {}).permit(*PERMITTED_ATTRIBUTES)
      end
    end
  end
end
