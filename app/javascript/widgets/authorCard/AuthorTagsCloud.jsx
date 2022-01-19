import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Wordcloud } from '@visx/wordcloud'
import { Text } from '@visx/text'
import { scaleLog } from '@visx/scale'

import { selectTag } from 'store/metadata/selectors'
import { selectSeed } from 'widgets/booksList/selectors'

const AuthorTagsCloud = (props) => {
  const { author } = props
  const words = Object.keys(author.booksTagsStats).map((tagId) => ({
    text: useSelector(selectTag(tagId)).name,
    value: tagId,
    weightX: author.booksTagsStats[tagId]
  }))
  console.log(words)
  const wrapperRef = useRef(null)
  const minValue = Math.min(...words.map(w => w.weightX))
  const maxValue = Math.max(...words.map(w => w.weightX))
  const fontScale = scaleLog({
    domain: [minValue, maxValue],
    range: [8, 30]
  })
  const width = 250 // wrapperRef?.current ? wrapperRef.current.offsetWidth - 21 : 0
  const seedNormalized = useSelector(selectSeed()) % 1000 / 1000.0
  console.log(seedNormalized)

  return (
    <div className='author-tags-cloud' ref={ wrapperRef }>
      <Wordcloud
        fontSize={ word => fontScale(word.weightX) }
        width={ width }
        height={ 100 }
        rotate={ 0 }
        words={ words }
        random={ () => seedNormalized }>
        { (words) => words.map((word, i) =>
          <Text
            key={ word.text }
            className='cloud-entry'
            transform={ `translate(${ word.x }, ${ word.y }) rotate(${ word.rotate })` }
            fontSize={ word.size }
            textAnchor='middle'
            onClick={ () => console.log(word.text) }>
            { `#${word.text}` }
          </Text>
        ) }
      </Wordcloud>
      <div>
        tags: { words.map(word => <div key={ word.text }>{ `${word.text} x ${word.weightX}` }</div>) }
        width: { width }
      </div>
    </div>
  );
}

export default AuthorTagsCloud;
