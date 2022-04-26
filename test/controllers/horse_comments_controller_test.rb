require "test_helper"

class HorseCommentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @horse_comment = horse_comments(:one)
  end

  test "should get index" do
    get horse_comments_url
    assert_response :success
  end

  test "should get new" do
    get new_horse_comment_url
    assert_response :success
  end

  test "should create horse_comment" do
    assert_difference('HorseComment.count') do
      post horse_comments_url, params: { horse_comment: { content: @horse_comment.content } }
    end

    assert_redirected_to horse_comment_url(HorseComment.last)
  end

  test "should show horse_comment" do
    get horse_comment_url(@horse_comment)
    assert_response :success
  end

  test "should get edit" do
    get edit_horse_comment_url(@horse_comment)
    assert_response :success
  end

  test "should update horse_comment" do
    patch horse_comment_url(@horse_comment), params: { horse_comment: { content: @horse_comment.content } }
    assert_redirected_to horse_comment_url(@horse_comment)
  end

  test "should destroy horse_comment" do
    assert_difference('HorseComment.count', -1) do
      delete horse_comment_url(@horse_comment)
    end

    assert_redirected_to horse_comments_url
  end
end
