exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}

//////////////////////

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  // getNode is a function that we get from oneCreateNode. It allows you to pull the actual node object representation of a file or an edge.
  // actions are the actions that we receive from Gatsby

  const { createNodeField } = actions // createNodeField is used to add a new field to our node

  // console.log(node.internal.type)

  if (node.internal.type === `MarkdownRemark`) {
    // We will create a SLUG.
    // A slug, inside of Gatsby, is the url/the link that the browser is able to access from our application in order to navigate to the page required.
    // => So we have to dynamically build out the slug and attach it to the node as a field bc we want to access that field inside of our application

    const slug = createFilePath({ node, getNode })
    // we can pass "basePath" as a third argument. basePath is something that you add when you want to add a base path to the url. (we don't need it here)

    createNodeField({
      node,
      name: "slug",
      value: slug, // the slug that we just created
    })

    // => Now on graphql if we go to allMarkdownRemark -> fields, we can see the slug which is the new property that we just added
    // (any field that you add to a node goes under this field's property)
  }
}

// From this function, we want to return a GraphQL query that gives us back all of our markdown remarks
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  // createPage is an action that allows us to build the pages inside of our application based on whatever properties we pass to it that will discover once we actually use it.

  // NOTE: with node.js, we can't use ES6 so need the parentheses here
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: node.fields.slug, // bc we need to pass the slug value to the query (in the blog-post.js file)
        },
      })
    })
  })
}
// When it runs createPages, it's going to create a page calling graphQL,by looping through every single markdown file and by manually creating a page for it using that blog-post template
