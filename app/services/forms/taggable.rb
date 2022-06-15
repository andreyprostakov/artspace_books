# frozen_string_literal: true

module Forms
  module Taggable
    extend ActiveSupport::Concern

    included do
      private

      def apply_update(record, update_params)
        tag_names = update_params[:tag_names]
        old_tags, new_tag_names = map_names_onto_tags(record, tag_names)
        old_tags.each { |tag| record.tag_connections.build(tag: tag) }
        new_tag_names.each { |name| record.tags.build(name: name) }
        super(record, update_params.except(:tag_names))
      end

      def map_names_onto_tags(record, names)
        names = names&.reject(&:blank?)
        return [[], []] if names.blank?

        assigned_tags = record.tags
        old_tags = Tag.where(name: names) - assigned_tags
        new_names = names - (old_tags + assigned_tags).map(&:name)
        [old_tags, new_names]
      end
    end
  end
end
