json.extract! media_release, :id, :date, :title, :content, :created_at, :updated_at
json.url media_release_url(media_release, format: :json)
