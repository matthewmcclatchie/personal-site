
import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(({ posts }) => (
  <div>
    <h1>It's blog time.</h1>
    <br />
    All Posts:
    <ul>
      {posts.map(({sys, fields}) => (
        fields.title
        // <li key={post.id}>
        //   <Link to={`/blog/post/${post.id}/`}>{fields.title}</Link>
        // </li>
      ))}
    </ul>
  </div>
))
