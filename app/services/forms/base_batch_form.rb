# frozen_string_literal: true

module Forms
  class BaseBatchForm
    def initialize(records)
      @records = records
    end

    def update(record_params)
      ApplicationRecord.transaction do
        updates = normalize_params(record_params)
        records.each do |record|
          apply_update(record, updates) || raise(ActiveRecord::Rollback)
        end
      end.present?
    rescue ActiveRecord::RecordInvalid
      false
    end

    protected

    attr_reader :records

    def normalize_params(params)
      params
    end

    def apply_update(record, update_params)
      record.update(update_params)
    end
  end
end
