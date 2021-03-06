import React from 'react'
import { Link, graphql } from 'gatsby'

import SEO from '../components/seo'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import { rhythm } from '../utils/typography'

import '../components/layout.css'

import styled from "styled-components"

const BlogLink = styled(Link)`
  text-decoration: none;
`
const BlogTitle = styled.h3`
  margin-bottom: 5px;
  color: darkslateblue;
`
const PagingTitle = styled.h6`
  margin-bottom: 5px;
  color: darkslateblue;
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={siteTitle}
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <BlogLink style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  <BlogTitle>{title}</BlogTitle>
                </BlogLink>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {!isFirst && (
            <BlogLink to={prevPage} rel="prev" style={{color: 'darkslateblue'}}>
              <PagingTitle>← Previous Page</PagingTitle>
            </BlogLink>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <li
              key={`pagination-number${i + 1}`}
              style={{
                margin: 0,
              }}
            >
              <BlogLink
                to={`/${i === 0 ? '' : i + 1}`}
                style={{
                  padding: rhythm(1 / 4),
                  textDecoration: 'none',
                  color: i + 1 === currentPage ? '#ffffff' : 'darkslateblue',
                  background: i + 1 === currentPage ? 'darkslateblue' : '',
                }}
              >
                {i + 1}
              </BlogLink>
            </li>
          ))}
          {!isLast && (
            <BlogLink to={nextPage} rel="next" style={{color: 'darkslateblue'}}>
              <PagingTitle>Next Page →</PagingTitle>
            </BlogLink>
          )}
        </ul><br/><hr/>
        <footer>
        <h5>Disclaimer</h5>
        <p>Any views or opinions expressed here are strictly my own. While I work for Amazon Web Services (AWS), this blog is not my job for AWS. I am solely responsible for all content published here. This is a personal exploration blog, not a corporate blog. Content published here is not read, reviewed, or approved in advance by my employer and does not necessarily represent or reflect the views or opinions of my employer or any of its divisions, subsidiaries, or business partners.</p><br/><br/><hr/>
        </footer>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
