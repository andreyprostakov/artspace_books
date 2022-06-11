InfoSpace / Books

An app to collect & present great books, with focus on chronology of publication.

Setup:

```sh
bundle install
yarn install
rake db.setup
rake db:migrate

rspec

foreman start
```

Code style checks:

```sh
bundle exec pronto run
yarn run eslint
```

Tests:

```sh
bundle exec rspec
```
