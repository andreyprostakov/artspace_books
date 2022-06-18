# frozen_string_literal: true

module Forms
  class BaseBatchForm
    include ActiveModel::Validations

    def initialize(records)
      @records = records
    end

    def update(record_params)
      return true if records.empty?

      ApplicationRecord.transaction do
        updates = normalize_params(record_params)
        records.each do |record|
          apply_update(record, updates) || raise(ActiveRecord::Rollback)
        end
      end.present?
    end

    protected

    attr_reader :records

    def normalize_params(params)
      params
    end

    def apply_update(record, update_params)
      record.update(update_params).tap do
        errors.merge!(record.errors)
      end
    end
  end
end
