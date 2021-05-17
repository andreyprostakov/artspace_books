// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import 'jquery'
import 'lodash'

Rails.start()
Turbolinks.start()
ActiveStorage.start()

class Navigator {
  constructor() {
    this.$booksListContainer = $('[data-behaviour=books-list]')
    this.futureUrl = this.$booksListContainer.data('nav-future-url')
    this.pastUrl = this.$booksListContainer.data('nav-past-url')
  }

  gotoFuture() {
    if (!this.futureUrl) return

    window.location = this.futureUrl
  }

  gotoPast() {
    if (!this.pastUrl) return

    window.location = this.pastUrl
  }
}

$(() => {
  console.log('page ready!')
  var navigator = new Navigator()
  $('body').on('keyup', (e) => {
    console.log(e.key)
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        console.log('Future!')
        navigator.gotoFuture()
        break
      case 'ArrowDown':
        e.preventDefault()
        console.log('Past!')
        navigator.gotoPast()
        break
    }
  })
})
