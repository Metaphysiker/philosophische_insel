require "application_system_test_case"

class WorkDaysTest < ApplicationSystemTestCase
  setup do
    @work_day = work_days(:one)
  end

  test "visiting the index" do
    visit work_days_url
    assert_selector "h1", text: "Work Days"
  end

  test "creating a Work day" do
    visit work_days_url
    click_on "New Work Day"

    fill_in "Date", with: @work_day.date
    click_on "Create Work day"

    assert_text "Work day was successfully created"
    click_on "Back"
  end

  test "updating a Work day" do
    visit work_days_url
    click_on "Edit", match: :first

    fill_in "Date", with: @work_day.date
    click_on "Update Work day"

    assert_text "Work day was successfully updated"
    click_on "Back"
  end

  test "destroying a Work day" do
    visit work_days_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Work day was successfully destroyed"
  end
end
