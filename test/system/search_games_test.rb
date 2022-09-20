require "application_system_test_case"

class SearchGamesTest < ApplicationSystemTestCase
  setup do
    @search_game = search_games(:one)
  end

  test "visiting the index" do
    visit search_games_url
    assert_selector "h1", text: "Search Games"
  end

  test "creating a Search game" do
    visit search_games_url
    click_on "New Search Game"

    fill_in "Category", with: @search_game.category
    fill_in "Cookie", with: @search_game.cookie
    fill_in "Identifier", with: @search_game.identifier
    click_on "Create Search game"

    assert_text "Search game was successfully created"
    click_on "Back"
  end

  test "updating a Search game" do
    visit search_games_url
    click_on "Edit", match: :first

    fill_in "Category", with: @search_game.category
    fill_in "Cookie", with: @search_game.cookie
    fill_in "Identifier", with: @search_game.identifier
    click_on "Update Search game"

    assert_text "Search game was successfully updated"
    click_on "Back"
  end

  test "destroying a Search game" do
    visit search_games_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Search game was successfully destroyed"
  end
end
