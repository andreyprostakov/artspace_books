class BooksLoader {
  initialLoad () {
    return $.ajax({
      url: '/books.json'
    })
  }
}

export default new BooksLoader()
