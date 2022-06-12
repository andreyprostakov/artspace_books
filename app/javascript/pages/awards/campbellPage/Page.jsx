import React from 'react'
import { Card } from 'react-bootstrap'
import PageTemplate from 'pages/templates/booksListYearly/Page'

const TAG_IDS = [0]

const Page = () => {
  const pageConfig = {
    booksListFilter: { tagIds: TAG_IDS },
    SidebarCardWidget: () => (
      <Card className='sidebar-card-widget'>
        <Card.Header className='widget-title'>
          John W. Campbell Memorial Award for Best Science Fiction Novel
        </Card.Header>
        <Card.Body>
          <a href='https://en.wikipedia.org/wiki/John_W._Campbell_Memorial_Award_for_Best_Science_Fiction_Novel'>
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
