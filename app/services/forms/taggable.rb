# frozen_string_literal: true

module Forms
  module Taggable
    extend ActiveSupport::Concern

    included do
      private

      alias_method :normalize_params_non_taggable, :normalize_params

      def normalize_params(params)
        attributes = normalize_params_non_taggable(params).except(:tag_names)
        attributes[:tags] = map_names_onto_tags(params[:tag_names]) if params.key?(:tag_names)
        attributes
      end

      def map_names_onto_tags(names)
        names = names.reject(&:blank?)
        existing_tags = Tag.where(name: names)
        non_existent_tags = (names - existing_tags.map(&:name)).map { |name| Tag.new(name: name) }
        existing_tags + non_existent_tags
      end
    end
  end
end
