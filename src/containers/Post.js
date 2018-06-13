import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(({ fields }) => (
  <div>
    <Link to="/blog/">{'<'} Back</Link>
    <br />
    <h3>{fields.title}</h3>
    <p>{fields.body}</p>
  </div>
))
