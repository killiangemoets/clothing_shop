import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ThirdPage = () => (
  <Layout>
    <h1>Hello from page 3</h1>
  </Layout>
)

export const Head = () => <Seo title="Page three" />

export default ThirdPage
