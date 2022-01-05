class StaticPagesController < ApplicationController
  after_action :verify_authorized, except: %i[welcome about essays stinah pferdefutter impressum iframer cockpit]

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
      description: :description,
      type: "website",
      image: image_url("wizard3.jpeg"),
      url: pferdefutter_url
    }

    @donation_project = DonationProject.find_by_title("Wizard braucht etwas zum Mampfen!")
    render layout: "application_blank"

  end

  def image_url(source)
    URI.join(root_url, ActionController::Base.helpers.image_url("wizard3.jpeg"))
  end

  def iframer
    render layout: "application_empty"
  end

  def cockpit
    @request = {dateRanges: []}

    last_day_of_month_array = (Date.new(2021, 01)..Date.today).select {|d| d.day == 1}.map {|d| d - 1}.drop(1)


    last_day_of_month_array.each  do |last_day_of_month|
      @request[:dateRanges].push({startDate: last_day_of_month.beginning_of_month, endDate: last_day_of_month})
    end

    #@request = @request.to_json


    render layout: "application_google_analytics"
  end

end
