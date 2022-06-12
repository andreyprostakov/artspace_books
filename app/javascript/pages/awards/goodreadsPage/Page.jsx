import React from 'react'
import { Card } from 'react-bootstrap'
import PageTemplate from 'pages/templates/booksListYearly/Page'

const TAG_IDS = [240]

const Page = () => {
  const pageConfig = {
    booksListFilter: { tagIds: TAG_IDS },
    SidebarCardWidget: () => (
      <Card className='sidebar-card-widget'>
        <Card.Header className='widget-title'>
          Goodreads Choice awards
        </Card.Header>
        <Card.Body>
          <a href='https://www.goodreads.com/choiceawards'>
            Official site
          </a>
          <br/>
          <a href='https://en.wikipedia.org/wiki/Goodreads_Choice_Awards'>
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
