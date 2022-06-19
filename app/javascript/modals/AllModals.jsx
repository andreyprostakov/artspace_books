import React from 'react'

import ModalsUrlStore from 'modals/ModalsUrlStore'
import BookNewModal from 'components/books/BookNewModal'
import BookEditModal from 'components/books/BookEditModal'
import AuthorNewModal from 'components/authors/AuthorNewModal'
import AuthorEditModal from 'components/authors/AuthorEditModal'
import TagEditModal from 'modals/tagForm/EditModal'
import ImageModal from 'widgets/imageModal/ImageModal'

const AllModals = () => {
  return (
    <>
      <ModalsUrlStore/>

      <AuthorNewModal/>
      <AuthorEditModal/>

      <BookNewModal/>
      <BookEditModal/>

      <TagEditModal/>

      <ImageModal/>
    </>
  )
}

export default AllModals
