server '18.218.69.246', user: 'deploy', roles: %w[app db web]

set :rails_env, :production
set :branch, :production
