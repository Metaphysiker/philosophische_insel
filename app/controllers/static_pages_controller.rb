class StaticPagesController < ApplicationController
  after_action :verify_authorized, except: %i[welcome about essays stinah]
  def welcome
  end

  def about

  end

  def essays
  end

  def visits
    authorize :static_pages
  end

  def stinah

  end
end
