import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'

import { rhythm } from '../utils/typography'

const Posts = ({ numPages, posts, pageNum = 1 }) => {
  function renderPrev() {
    if (pageNum < 2) {
      return undefined
    }

    const path = pageNum === 2 ? '/' : `/page/${pageNum - 1}`

    return <Link to={path}>Prev</Link>
  }

  function renderNext() {
    if (pageNum >= numPages) {
      return undefined
    }

    return (
      <Link to={`/page/${pageNum + 1}`} style={{ float: 'right' }}>
        Next
      </Link>
    )
  }

  return (
    <div>
      {posts.map(post => {
        if (post.node.path !== '/404/') {
          const title = get(post, 'node.frontmatter.title') || post.node.path

          return (
            <div key={post.node.frontmatter.path}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link
                  style={{ boxShadow: 'none' }}
                  to={post.node.frontmatter.path}
                >
                  {post.node.frontmatter.title}
                </Link>
              </h3>
              <small>{post.node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
            </div>
          )
        }
      })}
      {renderPrev()}
      {renderNext()}
    </div>
  )
}

Posts.propTypes = {
  posts: React.PropTypes.arrayOf(React.PropTypes.object),
}

export default Posts
