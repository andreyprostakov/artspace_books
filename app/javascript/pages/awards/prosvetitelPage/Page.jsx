import React from 'react'
import { Card } from 'react-bootstrap'
import PageTemplate from 'pages/templates/booksListYearly/Page'
import ExternalTextLink from 'components/ExternalTextLink'

const TAG_IDS = [249]

const Page = () => {
  const wikiUrl = 'https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%BE%D1%81%D0%B2%D0%B5%D1%82%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D0%BF%D1%80%D0%B5%D0%BC%D0%B8%D1%8F)'
  const pageConfig = {
    booksListFilter: { tagIds: TAG_IDS },
    SidebarCardWidget: () => (
      <Card className='sidebar-card-widget'>
        <Card.Header className='widget-title'>
          "Просветитель" awards (RU)
        </Card.Header>
        <Card.Body>
          <ExternalTextLink href='http://premiaprosvetitel.ru/' text='Official site'/>
          <br/>
          <ExternalTextLink href={ wikiUrl } text='Wiki'/>
        </Card.Body>
      </Card>
    ),
  }
  return (
    <PageTemplate config={ pageConfig }/>
  )
}

export default Page
