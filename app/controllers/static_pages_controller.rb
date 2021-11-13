class StaticPagesController < ApplicationController
  after_action :verify_authorized, except: %i[welcome about essays stinah pferdefutter]

  def welcome
  end

  def about
  end

  def essays
  end

  def visits
    authorize :static_pages
  end

  def pferdefutter
    @donation_project = DonationProject.find_by_title("Wizard braucht etwas zum Mampfen!")
  end

end
