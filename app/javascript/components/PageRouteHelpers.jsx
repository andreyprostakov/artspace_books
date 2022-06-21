import React from 'react'
import pageRoutes from 'components/pageRoutes'

const PageRouteHelpers = () => {
  return (
    <>
      { pageRoutes.map((route, i) =>
        <route.Helper key={ i }/>
      ) }
    </>
  )
}

export default PageRouteHelpers
