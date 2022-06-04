import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'
import classNames from 'classnames'

import {
  selectLeftSidebarShown,
  selectSortAttribute,
} from 'pages/authorsPage/selectors'
import { selectCurrentAuthorId } from 'store/axis/selectors'
import ImageContainer from 'components/ImageContainer'
import usePageUrlStore from 'pages/authorsPage/usePageUrlStore'

const AuthorsListItem = (props) => {
  const { author } = props
  const dispatch = useDispatch()
  const selectedAuthorId = useSelector(selectCurrentAuthorId())
  const leftSidebarShown = useSelector(selectLeftSidebarShown())
  const isSelected = author.id == selectedAuthorId
  const ref = useRef(null)

  const [{ sortOrder }, { addAuthorWidget }] = usePageUrlStore()
  const sortAttribute = useSelector(selectSortAttribute(sortOrder))

  useEffect(() => {
    if (isSelected) {
      ref.current?.scrollIntoViewIfNeeded()
    }
  })

  const onItemClick = (author) => {
    addAuthorWidget(author.id)
  }

  return (
    <Col key={ author.id } sm={ leftSidebarShown ? 3 : 2 } ref={ ref }>
      <div className={ classNames('authors-list-item', { 'selected': isSelected })}
           onClick={ () => onItemClick(author) }
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
