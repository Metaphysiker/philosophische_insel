#!/bin/bash
rails assets:clobber
RAILS_ENV=production rails assets:precompile
git add .
git commit -m "precompile"
