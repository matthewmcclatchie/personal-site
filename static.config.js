// Dependencies
import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
// Environment variables
require('dotenv').config()
// Contentful
const { createClient } = require('contentful')
// Contentful client connection
const client = createClient({
  accessToken: process.env.ACCESS_TOKEN,
  space: process.env.SPACE_ID,
})

export default {
  // This object will be accessible to every page.
  getSiteData: () => ({
    title: 'React Static',
  }),
  // Define routes in here, as well as getting data.
  // Axios is not required here. Perhaps change it out for a standard fetch.
  // If using fetch, investigate using Error() so that failures are sent to catch properly.
  getRoutes: async () => {
    // Contentful call
    const { items: posts } = await client.getEntries({
      limit: 100,
      order: 'sys.createdAt',
    })

    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/${post.fields.slug}`,
          component: 'src/containers/Post',
          getData: () => post,
        })),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends Component {
    render () {
      const {
        Html, Head, Body, children, renderMeta,
      } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
}
