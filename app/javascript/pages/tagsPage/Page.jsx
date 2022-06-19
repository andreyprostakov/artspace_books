import { sortBy, upperCase } from 'lodash'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'

import Layout from 'pages/Layout'
import PageConfigurer from 'pages/tagsPage/PageConfigurer'
import TagBadge from 'components/TagBadge'
import TagCard from 'widgets/sidebar/tagCard/TagCard'
import { selectCurrentTagId } from 'store/axis/selectors'
import { selectTagsCategoriesIndex } from 'store/tags/selectors'
import UrlStoreContext from 'store/urlStore/Context'

const TagsPage = () => {
  const dispatch = useDispatch()
  const sidebarShown = Boolean(useSelector(selectCurrentTagId()))
  const tagsByCategories = useSelector(selectTagsCategoriesIndex())
  const categories = Object.keys(tagsByCategories).sort()
  const { actions: { selectTag: urlSelectTag } } = useContext(UrlStoreContext)

  return (
    <>
      <PageConfigurer/>

      <Layout className='tags-page'>
        { sidebarShown &&
          <Col xs={ 4 }>
            <div className='page-sidebar'>
              <TagCard/>
            </div>
          </Col>
        }

        <Col xs={ sidebarShown ? 8 : 12 }>
          { categories.map((category, index) => {
            const tagsSorted = sortBy(tagsByCategories[category], tag => upperCase(tag.name))
            return (
              <div className='tags-index-category' key={ index }>
                <div className='category-name'>Category: { category }</div>
                <div className='category-contents'>
                  { tagsSorted.map((tag, tagIndex) =>

                    <div className='tags-index-entry' key={ tagIndex }>
                      <TagBadge key={ tag.id } text={ tag.name } id={ tag.id }
                        renderPostfix={ () => (tag.connectionsCount > 0 && ` (${tag.connectionsCount})`) }
                        variant='dark' className={ `tag-category-${category}` } onClick={ () => urlSelectTag(tag.id) }
                      />
                    </div>

                  ) }
                </div>
              </div>
            )
          } ) }
        </Col>
      </Layout>
    </>
  )
}

export default TagsPage
