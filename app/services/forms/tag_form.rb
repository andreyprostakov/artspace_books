# frozen_string_literal: true

module Forms
  class TagForm < Forms::BaseForm
    private

    def normalize_params(params)
      attributes = params.slice(:name)
      attributes[:category] = Tag.categories.invert[params[:category_id].to_i] if params[:category_id]
      attributes
    end
  end
end
