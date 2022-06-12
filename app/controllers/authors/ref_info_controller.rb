module Authors
  class RefInfoController < ApplicationController
    def index
      @authors = Author.all
    end

    def show
      @author = Author.find(params[:id])
    end
  end
end
