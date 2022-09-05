import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { HotKeys } from 'react-hotkeys'

import { selectSortedAuthors } from 'pages/authorsPage/selectors'

import Layout from 'pages/Layout'
import AuthorsIndexControls from 'sidebar/authorsIndexControls/Controls'
import AuthorsListItem from 'pages/authorsPage/components/AuthorsListItem'
import SidebarAuthorCard from 'pages/authorsPage/SidebarAuthorCard'
import PageConfigurer from 'pages/authorsPage/PageConfigurer'
import UrlStoreContext from 'store/urlStore/Context'

const AuthorsPage = () => {
  const { pageState: { sortOrder }, actions: { removeAuthorWidget } } = useContext(UrlStoreContext)
  const authors = useSelector(selectSortedAuthors(sortOrder))

  const keyMap = {
    SHIFT_ON: { sequence: 'shift', action: 'keydown' },
    SHIFT_OFF: { sequence: 'shift', action: 'keyup' },
    UP: 'Up',
  }

  const hotKeysHandlers = {
    SHIFT_ON: () => console.log('SHIFT PUSHED'),
    SHIFT_OFF: () => console.log('SHIFT RELEASED'),
    UP: () => console.log('UP'),
  }

  return (
    <>
      <PageConfigurer/>

      <HotKeys keyMap={ keyMap } handlers={ hotKeysHandlers }>
        <Layout className='authors-list-page'>
          <Layout.Sidebar>
            <AuthorsIndexControls/>
            <SidebarAuthorCard onClose={ () => removeAuthorWidget() }/>
          </Layout.Sidebar>

          <Layout.MainContent className='authors-list'>
            { authors.map(author =>
              <AuthorsListItem key={ author.id } author={ author }/>
            ) }
          </Layout.MainContent>
        </Layout>
      </HotKeys>
    </>
  )
}

export default AuthorsPage
