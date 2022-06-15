# frozen_string_literal: true

module Forms
  class BooksBatchForm < Forms::BaseBatchForm
    include Forms::Taggable
  end
end
