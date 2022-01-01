lock "~> 3.16.0"

set :application, "infospace_books"
set :repo_url, "git@github.com:andreyprostakov/infospace_books.git"
set :passenger_restart_with_touch, true

append :linked_files,
       'config/master.key'
append :linked_dirs,
       "log",
       "public/public",
       "public/system",
       "public/uploads",
       "tmp/cache",
       "tmp/pids",
       "vendor/bundle"
