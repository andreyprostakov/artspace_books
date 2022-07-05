import React, { useEffect } from 'react'

import BookNewModal from 'modals/bookNewForm/Modal'
import BookEditModal from 'modals/bookEditForm/Modal'
import AuthorNewModal from 'modals/authorNewForm/Modal'
import AuthorEditModal from 'modals/authorEditForm/Modal'
import ImageModal from 'modals/imageFullShow/Modal'
import TagEditModal from 'modals/tagEditForm/Modal'

const AllModals = () => {
  return (
    <>
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
