#!/bin/bash
ssh sandro@159.65.120.231
cd philosophische_insel/
git pull origin main
bundle config set --local without 'development test'
bundle install
RAILS_ENV=production rails db:migrate
sudo service nginx restart
exit
