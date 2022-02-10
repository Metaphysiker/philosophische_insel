require "test_helper"

class VeganVisitsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @vegan_visit = vegan_visits(:one)
  end

  test "should get index" do
    get vegan_visits_url
    assert_response :success
  end

  test "should get new" do
    get new_vegan_visit_url
    assert_response :success
  end

  test "should create vegan_visit" do
    assert_difference('VeganVisit.count') do
      post vegan_visits_url, params: { vegan_visit: { fullpath: @vegan_visit.fullpath, url: @vegan_visit.url } }
    end

    assert_redirected_to vegan_visit_url(VeganVisit.last)
  end

  test "should show vegan_visit" do
    get vegan_visit_url(@vegan_visit)
    assert_response :success
  end

  test "should get edit" do
    get edit_vegan_visit_url(@vegan_visit)
    assert_response :success
  end

  test "should update vegan_visit" do
    patch vegan_visit_url(@vegan_visit), params: { vegan_visit: { fullpath: @vegan_visit.fullpath, url: @vegan_visit.url } }
    assert_redirected_to vegan_visit_url(@vegan_visit)
  end

  test "should destroy vegan_visit" do
    assert_difference('VeganVisit.count', -1) do
      delete vegan_visit_url(@vegan_visit)
    end

    assert_redirected_to vegan_visits_url
  end
end
