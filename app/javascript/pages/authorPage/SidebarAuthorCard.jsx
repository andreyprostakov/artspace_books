import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { ButtonGroup } from 'react-bootstrap'

import ImageContainer from 'components/ImageContainer'
import SidebarWidget from 'sidebar/SidebarWidget'
import TagBadgesList from 'components/TagBadgesList'
import AuthorButtons from 'widgets/actionButtons/AuthorButtons'
import AuthorLifetime from 'components/AuthorLifetime'

import orders from 'pages/authorsPage/sortOrders'
import { selectCurrentAuthorId } from 'store/axis/selectors'
import { selectAuthorFull, selectAuthorDefaultImageUrl } from 'store/authors/selectors'
import { fetchAuthorFull } from 'store/authors/actions'
import { setImageSrc } from 'modals/imageFullShow/actions'
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
  const dispatch = useDispatch()
  const defaultPhotoUrl = useSelector(selectAuthorDefaultImageUrl())

  if (!routesReady) return null

  return (
    <SidebarWidget className='sidebar-widget-author-card'
      isCurrent={ false } isParent={ true } show={ routesReady }
      title={ `Author: ${ authorFull.fullname }` }>
      <ImageContainer className='author-image' url={ authorFull.thumbUrl || defaultPhotoUrl }
                      onClick={ () => dispatch(setImageSrc(authorFull.imageUrl)) }/>

      <div className='details-right'>
        <div className='author-name'>{ authorFull.fullname }</div>

        <div className='author-card-text'>
          <div>Years: <AuthorLifetime authorFull={ authorFull }/></div>

          <div>Popularity: { authorFull.popularity.toLocaleString() } pts (
            <a href={ authorsPagePath({ authorId: authorFull.id, sortOrder: orders.BY_RANK_ASCENDING }) }>
              #{ authorFull.rank }
            </a>
          )</div>
        </div>

        <TagBadgesList ids={ authorFull.tagIds } className='author-tags'/>
      </div>
      
      <ButtonGroup className='author-toolbar'>
        <AuthorButtons.ExternalReference url={ authorFull.reference }/>
        <AuthorButtons.EditLink id={ authorFull.id }/>
        <AuthorButtons.BookmarkControl id={ authorFull.id } tagIds={ authorFull.tagIds }/>
        <AuthorButtons.DeleteControl/>
        <AuthorButtons.AddBookLink/>
      </ButtonGroup>
    </SidebarWidget>
  )
}

SidebarAuthorCard.propTypes = {
  authorFull: PropTypes.object.isRequired,
}

export default AuthorCardWrap
