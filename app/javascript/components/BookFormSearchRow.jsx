import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWikipediaW, faGoodreadsG } from '@fortawesome/free-brands-svg-icons'

const SearchRow = (props) => {
  const { author, currentTitle } = props
  if (!currentTitle) { return null }

  const buildUrl = (service) => {
    if (!currentTitle) { return }

    var params = new URLSearchParams()
    params.append('q', `${service} ${author.fullname} ${currentTitle}`)
    return `http://google.com/search?${params.toString()}`
  }

  return (
    <Form.Group as={ Row }>
      <Form.Label column sm={ 3 }>Search</Form.Label>
      <Col sm={ 9 } className='search-row'>
        <a className='search-wiki' href={ buildUrl('wiki') } target='_blank'><FontAwesomeIcon icon={ faWikipediaW }/></a>
        <a className='search-goodreads' href={ buildUrl('goodreads') } target='_blank'><FontAwesomeIcon icon={ faGoodreadsG }/></a>
      </Col>
    </Form.Group>
  )
}

SearchRow.propTypes = {
  author: PropTypes.object.isRequired,
  currentTitle: PropTypes.string
}

export default SearchRow
