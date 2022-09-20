require "test_helper"

class SearchGamesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @search_game = search_games(:one)
  end

  test "should get index" do
    get search_games_url
    assert_response :success
  end

  test "should get new" do
    get new_search_game_url
    assert_response :success
  end

  test "should create search_game" do
    assert_difference('SearchGame.count') do
      post search_games_url, params: { search_game: { category: @search_game.category, cookie: @search_game.cookie, identifier: @search_game.identifier } }
    end

    assert_redirected_to search_game_url(SearchGame.last)
  end

  test "should show search_game" do
    get search_game_url(@search_game)
    assert_response :success
  end

  test "should get edit" do
    get edit_search_game_url(@search_game)
    assert_response :success
  end

  test "should update search_game" do
    patch search_game_url(@search_game), params: { search_game: { category: @search_game.category, cookie: @search_game.cookie, identifier: @search_game.identifier } }
    assert_redirected_to search_game_url(@search_game)
  end

  test "should destroy search_game" do
    assert_difference('SearchGame.count', -1) do
      delete search_game_url(@search_game)
    end

    assert_redirected_to search_games_url
  end
end
