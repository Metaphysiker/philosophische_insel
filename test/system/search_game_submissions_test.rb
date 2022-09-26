require "application_system_test_case"

class SearchGameSubmissionsTest < ApplicationSystemTestCase
  setup do
    @search_game_submission = search_game_submissions(:one)
  end

  test "visiting the index" do
    visit search_game_submissions_url
    assert_selector "h1", text: "Search Game Submissions"
  end

  test "creating a Search game submission" do
    visit search_game_submissions_url
    click_on "New Search Game Submission"

    fill_in "Email", with: @search_game_submission.email
    fill_in "Subscribe to newsletter", with: @search_game_submission.subscribe_to_newsletter
    click_on "Create Search game submission"

    assert_text "Search game submission was successfully created"
    click_on "Back"
  end

  test "updating a Search game submission" do
    visit search_game_submissions_url
    click_on "Edit", match: :first

    fill_in "Email", with: @search_game_submission.email
    fill_in "Subscribe to newsletter", with: @search_game_submission.subscribe_to_newsletter
    click_on "Update Search game submission"

    assert_text "Search game submission was successfully updated"
    click_on "Back"
  end

  test "destroying a Search game submission" do
    visit search_game_submissions_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Search game submission was successfully destroyed"
  end
end
