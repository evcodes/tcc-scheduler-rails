class StaticController < ApplicationController
    def home
        render json:{status: "it's alive"}
    end 
end
