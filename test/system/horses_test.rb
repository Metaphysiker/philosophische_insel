require "application_system_test_case"

class HorsesTest < ApplicationSystemTestCase
  setup do
    @horse = horses(:one)
  end

  test "visiting the index" do
    visit horses_url
    assert_selector "h1", text: "Horses"
  end

  test "creating a Horse" do
    visit horses_url
    click_on "New Horse"

    fill_in "Comment", with: @horse.comment
    fill_in "Name", with: @horse.name
    fill_in "Next shoeing date", with: @horse.next_shoeing_date
    click_on "Create Horse"

    assert_text "Horse was successfully created"
    click_on "Back"
  end

  test "updating a Horse" do
    visit horses_url
    click_on "Edit", match: :first

    fill_in "Comment", with: @horse.comment
    fill_in "Name", with: @horse.name
    fill_in "Next shoeing date", with: @horse.next_shoeing_date
    click_on "Update Horse"

    assert_text "Horse was successfully updated"
    click_on "Back"
  end

  test "destroying a Horse" do
    visit horses_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Horse was successfully destroyed"
  end
end
