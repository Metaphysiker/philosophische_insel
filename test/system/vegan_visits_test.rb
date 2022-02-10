require "application_system_test_case"

class VeganVisitsTest < ApplicationSystemTestCase
  setup do
    @vegan_visit = vegan_visits(:one)
  end

  test "visiting the index" do
    visit vegan_visits_url
    assert_selector "h1", text: "Vegan Visits"
  end

  test "creating a Vegan visit" do
    visit vegan_visits_url
    click_on "New Vegan Visit"

    fill_in "Fullpath", with: @vegan_visit.fullpath
    fill_in "Url", with: @vegan_visit.url
    click_on "Create Vegan visit"

    assert_text "Vegan visit was successfully created"
    click_on "Back"
  end

  test "updating a Vegan visit" do
    visit vegan_visits_url
    click_on "Edit", match: :first

    fill_in "Fullpath", with: @vegan_visit.fullpath
    fill_in "Url", with: @vegan_visit.url
    click_on "Update Vegan visit"

    assert_text "Vegan visit was successfully updated"
    click_on "Back"
  end

  test "destroying a Vegan visit" do
    visit vegan_visits_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Vegan visit was successfully destroyed"
  end
end
