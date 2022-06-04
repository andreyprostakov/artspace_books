const BOOK_CASE_WIDTH = 140
const BOOKS_SEPARATOR_WIDTH = 20

const widthOfPopularityChart = (length) => {
  return length * (BOOK_CASE_WIDTH + BOOKS_SEPARATOR_WIDTH) - BOOK_CASE_WIDTH + 60
}

const mapPopularityChart = (bookPopularities) => {
  return bookPopularities.map((popularity, i) =>
    ({
      x: i * (BOOK_CASE_WIDTH + BOOKS_SEPARATOR_WIDTH),
      y: popularity
    })
  )
}

export { mapPopularityChart, widthOfPopularityChart }
