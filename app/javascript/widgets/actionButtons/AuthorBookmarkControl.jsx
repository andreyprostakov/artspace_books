import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarkEmpty } from '@fortawesome/free-regular-svg-icons'
import PropTypes from 'prop-types'


import { selectTagBookmark, selectTagNames } from 'store/tags/selectors'
import { markAuthorAsBookmarked, unmarkAuthorAsBookmarked } from 'store/authors/actions'

const AuthorBookmarkControl = (props) => {
  const { id, tagIds } = props

  const dispatch = useDispatch()
  const tagNames = useSelector(selectTagNames(tagIds))
  const tagBookmark = useSelector(selectTagBookmark())
  const isBookmarked = tagNames.includes(tagBookmark)

  return (
    <>
      { isBookmarked ?
        <Button variant='outline-warning' title='Remove bookmark' href='#'
                onClick={ () => dispatch(unmarkAuthorAsBookmarked(id, tagIds)) }>
          <FontAwesomeIcon icon={ faBookmark }/>
        </Button>
        :
        <Button variant='outline-warning' title='Bookmark' href='#'
                onClick={ () => dispatch(markAuthorAsBookmarked(id, tagIds)) }>
          <FontAwesomeIcon icon={ faBookmarkEmpty }/>
        </Button>
      }
    </>
  )
}

AuthorBookmarkControl.propTypes = {
  id: PropTypes.number.isRequired,
  tagIds: PropTypes.array.isRequired,
}

export default AuthorBookmarkControl
