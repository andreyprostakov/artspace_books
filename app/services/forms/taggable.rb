# frozen_string_literal: true

module Forms
  module Taggable
    extend ActiveSupport::Concern

    included do
      def update(*args)
        super(*args)
      rescue ActiveRecord::RecordInvalid
        expose_invalid_new_tags
        false
      end

      private

      attr_reader :new_tags

      def normalize_params(params)
        if params.key?(:tag_names)
          tags = map_names_onto_tags(params[:tag_names])
          params = params.except(:tag_names).merge(tags: tags)
        end
        params
      end

      def map_names_onto_tags(names)
        names = names&.reject(&:blank?)
        return [] if names.blank?

        existing_tags = Tag.where(name: names)
        @new_tags = (names - existing_tags.map(&:name)).map { |name| Tag.new(name: name) }
        new_tags.map(&:save!)
        existing_tags + new_tags
      end

      def expose_invalid_new_tags
        tag_errors = new_tags.select { |tag| tag.errors.present? }
                             .flat_map { |tag| tag.errors.full_messages.map(&:downcase) }.uniq
        errors.add(:tags, tag_errors.join(', ')) if tag_errors.present?
      end

      def apply_update(record, update_params)
        super(
          record,
          update_params.merge(tags: update_params.fetch(:tags, []))
        )
      end
    end
  end
end
