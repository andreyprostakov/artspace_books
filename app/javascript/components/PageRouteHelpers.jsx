import React, { useEffect } from 'react'
import pageRoutes from 'components/pageRoutes'

import ModalsHelper from 'modals/RouteHelper'

const PageRouteHelpers = () => {
  return (
    <>
      <ModalsHelper/>
      { pageRoutes.map((route, i) =>
        <route.Helper key={ i }/>
      ) }
    </>
  )
}

export default PageRouteHelpers
