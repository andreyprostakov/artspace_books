import React from 'react'
import PropTypes from 'prop-types'

const PopularityBadge = (props) => {
  const { points } = props
  return (
    <span className='popularity-points'>
      { `${points.toLocaleString()} pts` }
    </span>
  )
}

PopularityBadge.propTypes = {
  points: PropTypes.number.isRequired
}

export default PopularityBadge
