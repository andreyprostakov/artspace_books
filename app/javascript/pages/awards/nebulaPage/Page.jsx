import React from 'react'
import { Card } from 'react-bootstrap'
import PageTemplate from 'pages/templates/booksListYearly/Page'

const TAG_IDS = [31]

const Page = () => {
  const pageConfig = {
    booksListFilter: { tagIds: TAG_IDS },
    SidebarCardWidget: () => (
      <Card className='sidebar-card-widget'>
        <Card.Header className='widget-title'>
          Nebula awards
        </Card.Header>
        <Card.Body>
          <a href='https://nebulas.sfwa.org/'>
            Official site
          </a>
          <br/>
          <a href='https://en.wikipedia.org/wiki/Nebula_Award'>
            Wiki
          </a>
        </Card.Body>
      </Card>
    ),
  }
  return (
    <PageTemplate config={ pageConfig }/>
  )
}

export default Page
