import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import { rhythm } from '../utils/typography'
import Posts from '../components/Posts'

const Homepage = ({ pathContext: { siteTitle, numPages, posts } }) => {
  return (
    <div>
      <Helmet title={siteTitle} />
      <Posts numPages={numPages} posts={posts} />
    </div>
  )
}

export default Homepage
