#media_release seed dump

rails db:seed:dump MODELS=MediaRelease File=db/seeds/media_releases.rb

#media seed dump

rails db:seed:dump MODELS=media File=db/seeds/media.rb


#when manifest is lacking

RAILS_ENV=production rails webpacker:compile
