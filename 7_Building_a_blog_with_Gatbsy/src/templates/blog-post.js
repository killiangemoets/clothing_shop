import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

// dangerouslySetInnerHTML is a react method, it will set all of the html value inside of this div

// we want the individual markdown remark related to the slug that we get
// We are going to the get that slug manually by passing in it as a parameter that our GraphQL will use.
export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
// "String!" bc it's gonna be a string and it's mandatory
// fields: { slug: { eq: $slug } } is to specify that I want to match this fieldon markdown where the slug is equivalent to this slug string that we pass in here
