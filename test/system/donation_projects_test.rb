require "application_system_test_case"

class DonationProjectsTest < ApplicationSystemTestCase
  setup do
    @donation_project = donation_projects(:one)
  end

  test "visiting the index" do
    visit donation_projects_url
    assert_selector "h1", text: "Donation Projects"
  end

  test "creating a Donation project" do
    visit donation_projects_url
    click_on "New Donation Project"

    fill_in "Amount already received", with: @donation_project.amount_already_received
    fill_in "Amount needed total", with: @donation_project.amount_needed_total
    fill_in "Description", with: @donation_project.description
    fill_in "Title", with: @donation_project.title
    click_on "Create Donation project"

    assert_text "Donation project was successfully created"
    click_on "Back"
  end

  test "updating a Donation project" do
    visit donation_projects_url
    click_on "Edit", match: :first

    fill_in "Amount already received", with: @donation_project.amount_already_received
    fill_in "Amount needed total", with: @donation_project.amount_needed_total
    fill_in "Description", with: @donation_project.description
    fill_in "Title", with: @donation_project.title
    click_on "Update Donation project"

    assert_text "Donation project was successfully updated"
    click_on "Back"
  end

  test "destroying a Donation project" do
    visit donation_projects_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Donation project was successfully destroyed"
  end
end
