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

    set_meta_tags title: 'Wizard braucht etwas zum Mampfen!',
              description: 'Mit seinen fast 34 Jahren kann Wizard kein Heu mehr fressen. Spende Wizard einen Futtersack!',
              keywords: 'Wizard, Wallach, Stinah, Stiftung Tiere in Not Animal Help, Futtersack, Spende'

    set_meta_tags og: {
      title: :title,
      image: ActionController::Base.helpers.image_url("wizard2.jpeg"),
    }

    @donation_project = DonationProject.find_by_title("Wizard braucht etwas zum Mampfen!")
    render layout: "application_blank"

  end

end
