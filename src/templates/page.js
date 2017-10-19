import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import { rhythm, scale } from '../utils/typography'
import Posts from '../components/Posts'

class PageTemplate extends React.Component {
  render() {
    const { siteTitle, pageNum, numPages, posts } = this.props.pathContext

    return (
      <div>
        <Helmet title={` Page ${pageNum} | ${siteTitle}`} />
        <Posts numPages={numPages} pageNum={pageNum} posts={posts} />
      </div>
    )
  }
}

export default PageTemplate
