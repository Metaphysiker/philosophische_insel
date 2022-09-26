require "test_helper"

class SearchGameSubmissionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @search_game_submission = search_game_submissions(:one)
  end

  test "should get index" do
    get search_game_submissions_url
    assert_response :success
  end

  test "should get new" do
    get new_search_game_submission_url
    assert_response :success
  end

  test "should create search_game_submission" do
    assert_difference('SearchGameSubmission.count') do
      post search_game_submissions_url, params: { search_game_submission: { email: @search_game_submission.email, subscribe_to_newsletter: @search_game_submission.subscribe_to_newsletter } }
    end

    assert_redirected_to search_game_submission_url(SearchGameSubmission.last)
  end

  test "should show search_game_submission" do
    get search_game_submission_url(@search_game_submission)
    assert_response :success
  end

  test "should get edit" do
    get edit_search_game_submission_url(@search_game_submission)
    assert_response :success
  end

  test "should update search_game_submission" do
    patch search_game_submission_url(@search_game_submission), params: { search_game_submission: { email: @search_game_submission.email, subscribe_to_newsletter: @search_game_submission.subscribe_to_newsletter } }
    assert_redirected_to search_game_submission_url(@search_game_submission)
  end

  test "should destroy search_game_submission" do
    assert_difference('SearchGameSubmission.count', -1) do
      delete search_game_submission_url(@search_game_submission)
    end

    assert_redirected_to search_game_submissions_url
  end
end
