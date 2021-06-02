import { sortBy } from 'lodash'
import React, { useEffect } from 'react'
import { useTable } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'

import { setupStoreForAuthorsPage } from 'store/actions'
import { selectAuthors } from 'store/selectors'
import { useUrlStore } from 'store/urlStore'

const AuthorsPage = () => {
  const dispatch = useDispatch()
  const authors = useSelector(selectAuthors())
  const sortedAuthors = sortBy(authors, 'fullname')
  const [{}, { gotoAuthor }] = useUrlStore()

  useEffect(() => {
    dispatch(setupStoreForAuthorsPage())
  }, [])

  return (
    <Table striped bordered hover size='sm'>
      <thead>
        <tr>
          <th>NAME</th>
          <th/>
        </tr>
      </thead>
      <tbody>
        { sortedAuthors.map(author =>
          <tr key={ author.id }>
            <td>{ author.fullname }</td>
            <td>
              <Button size='sm' variant='secondary' onClick={ (e) => { gotoAuthor(author.id) } }>BOOKS</Button>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default AuthorsPage
