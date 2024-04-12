ArtSpace / Books

An app to collect & present great books, with focus on chronology of publication.

Setup:

```sh
docker-compose up
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

Server debug:
put `byebug` in the code and run the app via
```sh
docker-compose run --service-ports web
```
