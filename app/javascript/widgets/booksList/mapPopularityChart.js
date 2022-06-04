const BOOK_CASE_WIDTH = 140
const BOOK_VIEW_WIDTH = 300
const BOOKS_SEPARATOR_WIDTH = 20

const widthOfPopularityChart = (length) => {
  return (length - 1) * (BOOK_CASE_WIDTH + BOOKS_SEPARATOR_WIDTH) + BOOK_VIEW_WIDTH - BOOK_CASE_WIDTH + 60
}

const mapPopularityChart = (bookPopularities, currentIndex) => {
  return bookPopularities.map((popularity, i) =>
    ({
      x: i * (BOOK_CASE_WIDTH + BOOKS_SEPARATOR_WIDTH) + (i > indexOfCurrent ? 160 : 0),
      y: popularity
    })
  )
}

export { mapPopularityChart, widthOfPopularityChart }
