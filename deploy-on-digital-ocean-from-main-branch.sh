#!/bin/bash
rails assets:clobber
RAILS_ENV=production rails assets:precompile
git add .
git commit -m "precompile"
git push origin main

ssh root@159.65.120.231 << EOF
   cd /home/sandro/philosophische_insel/

   git pull origin main
   bundle config set --local without 'development test'
   bundle install
   RAILS_ENV=production rails db:migrate
   sudo service nginx restart
EOF
