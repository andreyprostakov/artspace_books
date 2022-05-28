lock '~> 3.17.0'

set :application, 'infospace_books'
set :repo_url, 'git@github.com:andreyprostakov/infospace_books.git'
set :passenger_restart_with_touch, true
set :keep_releases, 2

append :linked_files,
       'config/master.key'
append :linked_dirs,
       'log',
       'public/public',
       'public/system',
       'public/uploads',
       'tmp/cache',
       'tmp/pids',
       'vendor/bundle'
