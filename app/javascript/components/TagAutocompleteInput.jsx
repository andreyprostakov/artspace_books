import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Autosuggest from 'react-autosuggest'
import classNames from 'classnames'

import { selectAllTags } from 'store/selectors'
import { filterByString } from 'utils/filterByString'
import { sortByString } from 'utils/sortByString'

const TagAutocompleteInput = (props) => {
  const { inputProps, onSuggestionSelected } = props
  const allTags = useSelector(selectAllTags())
  const [query, setQuery] = useState('')
  var suggestions = sortByString(
    filterByString(allTags, 'name', query),
    'name'
  )
  const exactMatch = suggestions.find(tag => tag.name == query)
  if (!exactMatch) { suggestions.unshift({ name: query, new: true }) }

  const handleKeyDown = (event) => {
    if (['Tab'].includes(event.code)) {
      event.preventDefault()
    }
  }

  return (
    <Autosuggest
      suggestions={ suggestions }
      onSuggestionsFetchRequested={ () => {} }
      onSuggestionsClearRequested={ () => {} }
      onSuggestionSelected={ (e, { suggestion: tag }) => { onSuggestionSelected(tag); setQuery('') } }
      getSuggestionValue={ (tag) => tag.name }
      renderSuggestion={ (tag) => renderSuggestion(tag, query) }
      inputProps={ {
        ...inputProps,
        value: query,
        onChange: (e, { newValue }) => setQuery(newValue),
        className: 'form-control',
        onKeyDown: handleKeyDown
      } }
      containerProps={ { className: 'tags-search-control' } }
    />
  )
}

const renderSuggestion = (tag, query) => {
  const classes = classNames(
    'suggestion',
    {
      'exact-match': !tag.new && (tag.name == query),
      'new-tag': tag.new
    }
  )
  return (
    <div className={ classes }>{ tag.name }</div>
  )
}

export default TagAutocompleteInput
