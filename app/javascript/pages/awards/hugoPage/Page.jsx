import React from 'react'
import { Card } from 'react-bootstrap'
import PageTemplate from 'pages/templates/booksListYearly/Page'

const TAG_IDS = [29, 181]

const Page = () => {
  const pageConfig = {
    booksListFilter: { tagIds: TAG_IDS },
    SidebarCardWidget: () => (
      <Card className='sidebar-card-widget'>
        <Card.Header className='widget-title'>
          Hugo awards
        </Card.Header>
        <Card.Body>
          <a href='https://www.thehugoawards.org/'>
            Official site
          </a>
          <br/>
          <a href='https://en.wikipedia.org/wiki/Hugo_Award_for_Best_Novel'>
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
