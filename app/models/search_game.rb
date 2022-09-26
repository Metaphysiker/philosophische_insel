class SearchGame < ApplicationRecord
  def self.count_of_findables
    1
  end

  def you_already_found_me
    "Du hast mich schon gefunden! Such weiter!"
  end

  def you_found_all
    "Wow! Du hast alle gefunden!"
  end

  def click_on_me
    "Klick auf mich!"
  end

end
