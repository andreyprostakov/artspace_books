import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

import { selectLastPage, selectPage, selectPerPage } from 'widgets/booksListLinear/selectors'
import UrlStoreContext from 'store/urlStore/Context'

const ListInlinePageControl = (props) => {
  const { shift } = props
  const currentPage = useSelector(selectPage())
  const perPage = useSelector(selectPerPage())
  const lastPage = useSelector(selectLastPage())
  const targetPage = currentPage + shift
  const setToBack = shift < 0
  const setToForth = !setToBack
  const cssClasses = classNames('linear-list-inline-page-control', { 'up': setToBack, 'down': setToForth })

  const { actions: { switchToIndexPage }, routes: { indexPaginationPath }, routesReady } = useContext(UrlStoreContext)

  if (!routesReady) return null
  if (setToBack && targetPage < 1) return null
  if (setToForth && currentPage >= lastPage) return null

  return (
    <div className={ cssClasses }>
      <a title={ `Go to page ${targetPage}` }
         onClick={ e => { e.preventDefault(); switchToIndexPage(targetPage, perPage) } }
         className='control-button' href={ indexPaginationPath(targetPage, perPage) }>
        <FontAwesomeIcon icon={ setToBack ? faArrowUp : faArrowDown }/>
      </a>
    </div>
  )
}

export default ListInlinePageControl
