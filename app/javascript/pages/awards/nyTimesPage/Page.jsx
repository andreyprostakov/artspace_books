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
          The New York Times Best Sellers
        </Card.Header>
        <Card.Body>
          <a href='https://www.nytimes.com/books/best-sellers/'>
            Official site
          </a>
          <br/>
          <a href='https://en.wikipedia.org/wiki/The_New_York_Times_Best_Seller_list'>
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
