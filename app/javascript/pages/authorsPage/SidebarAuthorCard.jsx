import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { ButtonGroup } from 'react-bootstrap'

import SidebarWidget from 'sidebar/SidebarWidget'
import TagBadgesList from 'components/TagBadgesList'
import AuthorButtons from 'widgets/actionButtons/AuthorButtons'
import AuthorLifetime from 'components/AuthorLifetime'

import { selectCurrentAuthorId } from 'store/axis/selectors'
import { selectAuthorFull } from 'store/authors/selectors'
import { fetchAuthorFull } from 'store/authors/actions'
import UrlStoreContext from 'store/urlStore/Context'

const AuthorCardWrap = () => {
  const authorId = useSelector(selectCurrentAuthorId())
  const authorFull = useSelector(selectAuthorFull(authorId))
  const dispatch = useDispatch()
  useEffect(() => {
    if (authorId && !authorFull) dispatch(fetchAuthorFull(authorId))
  }, [authorId])

  if (!authorFull) return null
  return (<SidebarAuthorCard authorFull={ authorFull }/>)
}

const SidebarAuthorCard = (props) => {
  const { authorFull } = props
  const { routes: { authorsPagePath }, routesReady } = useContext(UrlStoreContext)

  return (
    <SidebarWidget className='sidebar-widget-author-card'
      isCurrent={ false } isParent={ false } show={ routesReady }
      title={ `Author: ${ authorFull.fullname }` }>
      <div className='details'>
        <div className='author-card-text'>
          <div>Years: <AuthorLifetime authorFull={ AuthorLifetime }/></div>

          <div>Popularity: { authorFull.popularity.toLocaleString() } pts</div>
        </div>

        <TagBadgesList ids={ authorFull.tagIds } className='author-tags'/>
      </div>
      
      <ButtonGroup className='author-toolbar'>
        <AuthorButtons.ExternalReference url={ authorFull.reference }/>
        <AuthorButtons.InfoLink id={ authorFull.id } booksCount={ authorFull.booksCount }/>
        <AuthorButtons.EditLink id={ authorFull.id }/>
        <AuthorButtons.BookmarkControl id={ authorFull.id } tagIds={ authorFull.tagIds }/>
        <AuthorButtons.DeleteControl/>
      </ButtonGroup>
    </SidebarWidget>
  )
}

SidebarAuthorCard.propTypes = {
  authorFull: PropTypes.object.isRequired,
}

export default AuthorCardWrap
