require "application_system_test_case"

class WorkerWorkdaysTest < ApplicationSystemTestCase
  setup do
    @worker_workday = worker_workdays(:one)
  end

  test "visiting the index" do
    visit worker_workdays_url
    assert_selector "h1", text: "Worker Workdays"
  end

  test "creating a Worker workday" do
    visit worker_workdays_url
    click_on "New Worker Workday"

    click_on "Create Worker workday"

    assert_text "Worker workday was successfully created"
    click_on "Back"
  end

  test "updating a Worker workday" do
    visit worker_workdays_url
    click_on "Edit", match: :first

    click_on "Update Worker workday"

    assert_text "Worker workday was successfully updated"
    click_on "Back"
  end

  test "destroying a Worker workday" do
    visit worker_workdays_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Worker workday was successfully destroyed"
  end
end
