class Navigator {
  constructor() {
    this.$booksListContainer = $('[data-behaviour=books-list]')
    this.allYears = this.$booksListContainer.data('books-years')
    this.currentYear = this.$booksListContainer.data('current-year')
    this.currentYearIndex = this.allYears.indexOf(this.currentYear);
  }

  gotoNow() {
    this.gotoYear(null)
  }

  shift(offset) {
    var requestedIndex = this.currentYearIndex + offset
    var index = _.max(
      [0, _.min([this.allYears.length - 1, requestedIndex])]
    )
    this.gotoYear(this.allYears[index])
  }

  gotoYear(year) {
    window.location = this.buildUrlToYear(year)
  }

  buildUrlToYear(year) {
    return '/books?year=' + year
  }
}

$(() => {
  var navigator = new Navigator()

  $('body').on('keyup', (e) => {
    console.log(e.key)
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        navigator.shift(+1)
        break
      case 'ArrowDown':
        e.preventDefault()
        navigator.shift(-1)
        break
      case 'Home':
        e.preventDefault()
        navigator.gotoNow()
        break
      case 'End':
        e.preventDefault()
        navigator.shift(-navigator.currentYearIndex)
        break
      case 'PageUp':
        e.preventDefault()
        navigator.shift(+3)
        break
      case 'PageDown':
        e.preventDefault()
        navigator.shift(-3)
        break
    }
  })
})
