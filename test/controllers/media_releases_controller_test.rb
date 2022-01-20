require "test_helper"

class MediaReleasesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @media_release = media_releases(:one)
  end

  test "should get index" do
    get media_releases_url
    assert_response :success
  end

  test "should get new" do
    get new_media_release_url
    assert_response :success
  end

  test "should create media_release" do
    assert_difference('MediaRelease.count') do
      post media_releases_url, params: { media_release: { content: @media_release.content, date: @media_release.date, title: @media_release.title } }
    end

    assert_redirected_to media_release_url(MediaRelease.last)
  end

  test "should show media_release" do
    get media_release_url(@media_release)
    assert_response :success
  end

  test "should get edit" do
    get edit_media_release_url(@media_release)
    assert_response :success
  end

  test "should update media_release" do
    patch media_release_url(@media_release), params: { media_release: { content: @media_release.content, date: @media_release.date, title: @media_release.title } }
    assert_redirected_to media_release_url(@media_release)
  end

  test "should destroy media_release" do
    assert_difference('MediaRelease.count', -1) do
      delete media_release_url(@media_release)
    end

    assert_redirected_to media_releases_url
  end
end
