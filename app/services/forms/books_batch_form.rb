# frozen_string_literal: true

module Forms
  class BooksBatchForm < Forms::BaseBatchForm
    include Forms::Taggable

    private

    def apply_update(record, update_params)
      super(
        record,
        update_params.merge(tags: record.tags | update_params.fetch(:tags, []))
      )
    end
  end
end
