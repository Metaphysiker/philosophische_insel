#!/bin/bash
ssh sandro@159.65.120.231 << EOF
  cd philosophische_insel
  pg_dump philosophische_insel_production > latest.sql
EOF

scp sandro@159.65.120.231:/home/sandro/philosophische_insel/latest.sql latest.sql

rails db:drop DISABLE_DATABASE_ENVIRONMENT_CHECK=1
rails db:create
rails db:migrate

psql philosophische_insel_development < latest.sql

ssh sandro@159.65.120.231 << EOF
  cd philosophische_insel
  pg_dump philosophische_insel_production > latest.sql
EOF
