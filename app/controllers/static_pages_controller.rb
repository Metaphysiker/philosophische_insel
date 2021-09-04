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
    if params[:donation_project_slug].present?
      @donation_project = DonationProject.friendly.find(params[:donation_project_slug])
    else
      @donation_project = DonationProject.friendly.find(1)
    end
  end
end
