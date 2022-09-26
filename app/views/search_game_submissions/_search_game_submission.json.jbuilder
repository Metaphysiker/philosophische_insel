json.extract! search_game_submission, :id, :email, :subscribe_to_newsletter, :created_at, :updated_at
json.url search_game_submission_url(search_game_submission, format: :json)
