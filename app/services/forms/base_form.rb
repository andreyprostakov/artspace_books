# frozen_string_literal: true

module Forms
  class BaseForm
    def initialize(record)
      @record = record
    end

    def update(record_params)
      ApplicationRecord.transaction do
        apply_update(record, normalize_params(record_params)) || raise(ActiveRecord::Rollback)
      end || false
    end

    def errors
      record.errors
    end

    protected

    attr_reader :record

    def normalize_params(params)
      params
    end

    def apply_update(record, update_params)
      record.update(update_params)
    end
  end
end
