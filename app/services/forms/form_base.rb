# frozen_string_literal: true

module Forms
  class FormBase
    def initialize(record)
      @record = record
    end

    def update(record_params)
      ApplicationRecord.transaction do
        record.update(normalize_params(record_params)) || raise(ActiveRecord::Rollback)
      end || false
    end

    protected

    attr_reader :record

    def normalize_params(params)
      params
    end
  end
end
