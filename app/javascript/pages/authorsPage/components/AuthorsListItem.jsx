import React, { useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'
import classNames from 'classnames'

import {
  selectSortAttribute,
} from 'pages/authorsPage/selectors'
import { selectCurrentAuthorId } from 'store/axis/selectors'
import ImageContainer from 'components/ImageContainer'
import UrlStoreContext from 'store/urlStore/Context'

const AuthorsListItem = (props) => {
  const { author } = props
  const dispatch = useDispatch()
  const selectedAuthorId = useSelector(selectCurrentAuthorId())
  const isSelected = author.id == selectedAuthorId
  const ref = useRef(null)

  const { pageState: { sortOrder }, actions: { showAuthor } } = useContext(UrlStoreContext)
  const sortAttribute = useSelector(selectSortAttribute(sortOrder))

  useEffect(() => {
    if (isSelected) ref.current?.scrollIntoViewIfNeeded()
  })

  return (
    <Col key={ author.id } sm={3} ref={ ref }>
      <div className={ classNames('authors-list-item', { 'selected': isSelected })}
           onClick={ () => showAuthor(author.id) }
           title={ author.fullname }>
        { author.thumbUrl && <ImageContainer className='thumb' url={ author.thumbUrl }/> }

        <div className='author-name'>{ author.fullname }</div>

        { sortAttribute == 'birthYear' &&
          <div className='author-years'>{ author.birthYear }</div>
        }

        { sortAttribute == 'rank' &&
          <div className='author-rank'>#{ author.rank }</div>
        }
      </div>
    </Col>
  )
}

export default AuthorsListItem
