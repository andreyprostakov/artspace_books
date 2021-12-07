import { isEmpty, sortBy } from 'lodash'
import React, { useEffect } from 'react'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import ImageContainer from 'components/ImageContainer'
import TagBadge from 'components/TagBadge'
import PopularityBadge from 'components/small/PopularityBadge'
import CloseIcon from 'components/icons/CloseIcon'

import orders from 'pages/authorsPage/sortOrders'
import { selectCurrentAuthorDetails, selectTags } from 'store/selectors'
import { useUrlStore } from 'store/urlStore'
import { setupStoreForAuthorCard } from 'store/actions'

const AuthorCard = (props) => {
  const [{ authorId },
         { gotoAuthorBooks, openEditAuthorModal, openNewBookModal },
         { editAuthorModalPath, authorBooksPath, authorsPath, newBookModalPath }] = useUrlStore()
  const { onClose } = props
  const dispatch = useDispatch()
  const authorDetails = useSelector(selectCurrentAuthorDetails())
  const tags = useSelector(selectTags(authorDetails.tagIds))
  useEffect(() => {
    if (!authorId) { return }

    dispatch(setupStoreForAuthorCard(authorId))
  }, [authorId])
  if (isEmpty(authorDetails) || (authorDetails.id && authorDetails.id !== authorId)) {
    return null
  }

  const renderLifetime = () => {
    if (!authorDetails.birthYear) { return null }

    const birthLabel = `${authorDetails.birthYear}--`
    const age = authorDetails.deathYear
                ? authorDetails.deathYear - authorDetails.birthYear
                : new Date().getFullYear() - authorDetails.birthYear
    return(
      <>
        { birthLabel }
        { authorDetails.deathYear }
        &nbsp;(
          <a href={ authorsPath({ authorId: authorDetails.id, sortOrder: orders.BY_YEAR_ASCENDING }) }>
            age { age }
          </a>
        )
      </>
    )
  }

  const sortedTags = sortBy(tags, tag => tag.connectionsCount)

  return (
    <Card className='author-card'>
      <CloseIcon onClick={ () => onClose && onClose() }/>

      { authorDetails.imageUrl && <ImageContainer className='author-image' url={ authorDetails.imageUrl }/> }

      <Card.Body>
        <Card.Title>
          { authorDetails.wikiUrl
            ? <a href={ authorDetails.wikiUrl } target='_blank'>{ authorDetails.fullname }</a>
            : authorDetails.fullname
          }
        </Card.Title>
        <Card.Text className='author-card-text'>
          <span>Years: { renderLifetime() }</span>
          <br/>
          <span>Popularity: { authorDetails.popularity.toLocaleString() } pts (
            <a href={ authorsPath({ authorId: authorDetails.id, sortOrder: orders.BY_RANK_ASCENDING }) }>#{ authorDetails.rank }</a>
          )</span>
        </Card.Text>

        <div className='author-tags'>
          { sortedTags.map(tag =>
            <TagBadge text={ tag.name } id={ tag.id } key={ tag.id } variant='dark'/>
          ) }
        </div>

        <ButtonGroup>
          <Button variant='outline-warning' href={ editAuthorModalPath(authorDetails.id) } onClick={ (e) => { e.preventDefault(); openEditAuthorModal() } }>Edit</Button>
          <Button variant='outline-info' href={ authorBooksPath(authorDetails.id) } onClick={ (e) => { e.preventDefault(); gotoAuthorBooks(authorDetails.id) } }>Books ({authorDetails.booksCount})</Button>
          <Button variant='outline-info' href={ newBookModalPath() } onClick={ (e) => { e.preventDefault(); openNewBookModal() } }>+ Book</Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  )
}

export default AuthorCard
