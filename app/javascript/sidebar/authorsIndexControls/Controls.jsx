import React from 'react'
import { useSelector } from 'react-redux'

import {
  selectAuthorsTotal,
  selectPage,
  selectPerPage,
} from 'pages/authorsPage/selectors'
import { selectCurrentAuthorId } from 'store/axis/selectors'

import Pagination from 'sidebar/authorsIndexControls/Pagination'
import SortingDropdown from 'sidebar/authorsIndexControls/SortingDropdown'
import SidebarWidget from 'sidebar/SidebarWidget'

const AuthorsIndexControls = () => {
  const totalCount = useSelector(selectAuthorsTotal())
  const page = useSelector(selectPage())
  const perPage = useSelector(selectPerPage())
  const authorId = useSelector(selectCurrentAuthorId())

  return (
    <SidebarWidget className='sidebar-authors-index-controls-widget'
      isCurrent={ true } isParent={ Boolean(authorId) }
      title={ `Authors: ${ totalCount }` }>
      <SortingDropdown/>
      <Pagination/>
    </SidebarWidget>
  )
}

export default AuthorsIndexControls
