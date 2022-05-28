server '3.144.75.143', user: 'deploy', roles: %w[app db web]

append :linked_files,
       'db/production.sqlite3'

set :rails_env, :production
set :branch, :production
