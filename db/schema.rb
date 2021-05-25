# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_25_215829) do

  create_table "authors", force: :cascade do |t|
    t.string "fullname", null: false
    t.string "reference"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "image_url"
    t.string "wiki_url"
    t.integer "birth_year"
    t.integer "death_year"
  end

  create_table "books", force: :cascade do |t|
    t.string "title", null: false
    t.integer "year_published", null: false
    t.string "wiki_url"
    t.integer "author_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "original_title"
    t.string "image_url"
    t.string "goodreads_url"
    t.index ["author_id"], name: "index_books_on_author_id"
    t.index ["year_published"], name: "index_books_on_year_published"
  end

end
