require "test_helper"

class DonationProjectsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @donation_project = donation_projects(:one)
  end

  test "should get index" do
    get donation_projects_url
    assert_response :success
  end

  test "should get new" do
    get new_donation_project_url
    assert_response :success
  end

  test "should create donation_project" do
    assert_difference('DonationProject.count') do
      post donation_projects_url, params: { donation_project: { amount_already_received: @donation_project.amount_already_received, amount_needed_total: @donation_project.amount_needed_total, description: @donation_project.description, title: @donation_project.title } }
    end

    assert_redirected_to donation_project_url(DonationProject.last)
  end

  test "should show donation_project" do
    get donation_project_url(@donation_project)
    assert_response :success
  end

  test "should get edit" do
    get edit_donation_project_url(@donation_project)
    assert_response :success
  end

  test "should update donation_project" do
    patch donation_project_url(@donation_project), params: { donation_project: { amount_already_received: @donation_project.amount_already_received, amount_needed_total: @donation_project.amount_needed_total, description: @donation_project.description, title: @donation_project.title } }
    assert_redirected_to donation_project_url(@donation_project)
  end

  test "should destroy donation_project" do
    assert_difference('DonationProject.count', -1) do
      delete donation_project_url(@donation_project)
    end

    assert_redirected_to donation_projects_url
  end
end
