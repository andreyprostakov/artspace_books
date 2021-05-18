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

import 'components/clipboard-control'

Rails.start()
Turbolinks.start()
ActiveStorage.start()

class Navigator {
  constructor() {
    this.$booksListContainer = $('[data-behaviour=books-list]')
    this.nowUrl = '/books'
    this.futureUrl = this.$booksListContainer.data('nav-future-url')
    this.pastUrl = this.$booksListContainer.data('nav-past-url')
    this.bigBangUrl = this.$booksListContainer.data('nav-big-bang-url')
  }

  gotoNow() {
    window.location = this.nowUrl
  }

  gotoFuture() {
    if (!this.futureUrl) return

    window.location = this.futureUrl
  }

  gotoPast() {
    if (!this.pastUrl) return

    window.location = this.pastUrl
  }

  gotoBigBang() {
    window.location = this.bigBangUrl
  }
}

$(() => {
  var navigator = new Navigator()

  $('body').on('keyup', (e) => {
    console.log(e.key)
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        navigator.gotoFuture()
        break
      case 'ArrowDown':
        e.preventDefault()
        navigator.gotoPast()
        break
      case 'Home':
        e.preventDefault()
        navigator.gotoNow()
        break
      case 'End':
        e.preventDefault()
        navigator.gotoBigBang()
        break
    }
  })
})
