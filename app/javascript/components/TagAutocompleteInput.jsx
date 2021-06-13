import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Autosuggest from 'react-autosuggest'

import { selectAllTags } from 'store/selectors'
import { filterByString } from 'utils/filterByString'
import { sortByString } from 'utils/sortByString'

const TagAutocompleteInput = (props) => {
  const { onSuggestionSelected } = props
  const allTags = useSelector(selectAllTags())
  const [query, setQuery] = useState('')
  const suggestions = sortByString(
    filterByString(allTags, 'name', query),
    'name'
  )

  return (
    <Autosuggest
      suggestions={ suggestions }
      onSuggestionsFetchRequested={ () => {} }
      onSuggestionsClearRequested={ () => {} }
      onSuggestionSelected={ (e, { suggestion: tag }) => { onSuggestionSelected(tag); setQuery('') } }
      getSuggestionValue={ (tag) => tag.name }
      renderSuggestion={ (tag) => <div className='suggestion'>{ tag.name }</div> }
      inputProps={ { value: query, onChange: (e, { newValue }) => setQuery(newValue), className: 'form-control' } }
      containerProps={ { className: 'tags-search-control' } }
    />
  )
}

export default TagAutocompleteInput
