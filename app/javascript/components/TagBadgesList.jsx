import { sortBy } from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import TagBadge from 'components/TagBadge'
import { selectTagsRefsByIds, selectVisibleTags } from 'store/tags/selectors'

const TagBadgesList = (props) => {
  const { className, ids } = props
  const tags = useSelector(selectTagsRefsByIds(ids))
  const visibleTags = useSelector(selectVisibleTags(tags))
  const sortedTags = sortBy(visibleTags, tag => tag.connectionsCount)

  return (
    <div className={ className }>
      { sortedTags.map(tag =>
        <TagBadge text={ tag.name } id={ tag.id } key={ tag.id } variant='dark'/>
      ) }
    </div>
  )
}

TagBadgesList.propTypes = {
  className: PropTypes.string,
  ids: PropTypes.array.isRequired,
}

export default TagBadgesList
