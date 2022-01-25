#!/bin/bash
rails assets:clobber
RAILS_ENV=production rails assets:precompile
