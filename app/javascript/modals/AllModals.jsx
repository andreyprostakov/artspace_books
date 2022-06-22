import React, { useEffect } from 'react'

import ModalsUrlStore from 'modals/UrlStore'
import BookNewModal from 'modals/bookNewForm/Modal'
import BookEditModal from 'modals/bookEditForm/Modal'
import AuthorNewModal from 'modals/authorNewForm/Modal'
import AuthorEditModal from 'modals/authorEditForm/Modal'
import TagEditModal from 'modals/tagEditForm/Modal'
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
