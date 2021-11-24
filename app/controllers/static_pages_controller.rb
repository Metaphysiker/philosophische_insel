class StaticPagesController < ApplicationController
  after_action :verify_authorized, except: %i[welcome about essays stinah pferdefutter impressum]

  def welcome
  end

  def about
  end

  def essays
  end

  def impressum

  end

  def visits
    authorize :static_pages
  end

  def pferdefutter

    set_meta_tags title: 'Wizard braucht Seniorenfutter',
              description: 'Mit seinen bald 34 Jahren ist Wizard auf Spezialfutter angewiesen. Magst du Futtersackpate werden?',
              keywords: 'Wizard, Wallach, Stinah, Stiftung Tiere in Not Animal Help, Spezialfutter, Futtersack, Spende'

    set_meta_tags og: {
      title: :title,
      image: ActionController::Base.helpers.image_url("wizard2.jpeg"),
    }

    @donation_project = DonationProject.find_by_title("Wizard braucht etwas zum Mampfen!")
    render layout: "application_blank"

  end

end
