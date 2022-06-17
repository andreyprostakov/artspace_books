# frozen_string_literal: true

module Forms
  class BaseForm
    include ActiveModel::Validations

    def initialize(record)
      @record = record
    end

    def update(record_params)
      ApplicationRecord.transaction do
        apply_update(record, normalize_params(record_params)) || raise(ActiveRecord::Rollback)
      end || false
    end

    protected

    attr_reader :record

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
