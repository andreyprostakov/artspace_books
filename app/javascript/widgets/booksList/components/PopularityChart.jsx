import React from 'react'
import { useSelector } from 'react-redux'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

import { showBook } from 'widgets/booksList/actions'
import { selectBookPopularities } from 'widgets/booksList/selectors'

const BOOK_CASE_WIDTH = 140
const BOOK_VIEW_WIDTH = 300
const BOOKS_SEPARATOR_WIDTH = 20

const widthForBooksRow = (length) => {
  return (length - 1) * (BOOK_CASE_WIDTH + BOOKS_SEPARATOR_WIDTH) + BOOK_VIEW_WIDTH - BOOK_CASE_WIDTH + 60
}

const PopularityChart = (props) => {
  const { displayedBookIds, currentBookId } = props
  const bookPopularities = useSelector(selectBookPopularities(displayedBookIds))
  const indexOfCurrent = displayedBookIds.indexOf(currentBookId)
  const chartWidth = widthForBooksRow(displayedBookIds.length)

  const points = bookPopularities.map((popularity, i) =>
    ({
      x: i * (BOOK_CASE_WIDTH + BOOKS_SEPARATOR_WIDTH) + (i > indexOfCurrent ? 160 : 0),
      y: popularity
    })
  )
  const options = {
    responsive: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { display: false, type: 'linear', min: 0, max: chartWidth },
      y: { display: false, min: 0 },
    },
    layout: {
      padding: 0,
      autoPadding: false,
    },
    animation: {
      duration: 2000,
    },
  }

  const data = {
    type: 'line',
    datasets: [
      {
        data: points,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      }
    ],
  }

  return (
    <div className='popularities-chart'>
      <Line options={options} data={data} width={chartWidth} height='188'/>
    </div>
  )
}

export default PopularityChart
