const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)

const homepageSize = 5
const paginationSize = 10

function getNumPages(total) {
  return Math.ceil((total - homepageSize) / paginationSize) + 1
}

function createHomepage(createPage, siteTitle, posts) {
  const homepage = path.resolve("./src/templates/homepage.js")

  createPage({
    path: '/',
    component: homepage,
    context: {
      siteTitle,
      posts: posts.slice(0, homepageSize),
      numPages: getNumPages(posts.length),
    },
  })
}

function createPosts(createPage, siteTitle, posts) {
  const blogPost = path.resolve("./src/templates/blog-post.js")

  _.each(posts, post => createPage({
    path: post.node.frontmatter.path,
    component: blogPost,
    context: {
      path: post.node.frontmatter.path,
    },
  }))
}

function createPagination(createPage, siteTitle, posts) {
  const page = path.resolve("./src/templates/page.js")

  _(posts)
    .chunk(paginationSize)
    .slice(1)
    .each((chunk, i) => createPage({
      path: `/page/${i + 2}`,
      component: page,
      context: {
        siteTitle,
        posts: chunk,
        pageNum: i + 2,
        numPages: getNumPages(posts.length),
      }
    }))
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return graphql(`{
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: ${1e9}
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }`)
  .then(result => {
    if (result.errors) {
      console.log(result.errors)
      return reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges
    const siteTitle = result.data.site.siteMetadata.title

    createHomepage(createPage, siteTitle, posts)
    createPosts(createPage, siteTitle, posts)
    createPagination(createPage, siteTitle, posts)
  })
}
