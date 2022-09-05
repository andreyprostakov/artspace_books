import React, { useContext } from 'react'

import UrlStoreContext from 'store/urlStore/Context'
import orders from 'pages/authorsPage/sortOrders'

const AuthorLifetime = (props) => {
  const { authorFull } = props
  if (!authorFull.birthYear) { return null }
  const { routes: { authorsPagePath }, routesReady } = useContext(UrlStoreContext)

  const birthLabel = `${authorFull.birthYear}--`
  const age = authorFull.deathYear
              ? authorFull.deathYear - authorFull.birthYear
              : new Date().getFullYear() - authorFull.birthYear

  if (!routesReady) return null

  return(
    <>
      { birthLabel }
      { authorFull.deathYear }
      &nbsp;(
        <a href={ authorsPagePath({ authorId: authorFull.id, sortOrder: orders.BY_YEAR_ASCENDING }) }>
          age { age }
        </a>
      )
    </>
  )
}

export default AuthorLifetime
