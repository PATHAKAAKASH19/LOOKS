import React from 'react'
import {Link} from "react-router-dom"

export default function ErrorPage() {
  return (
    <div>
    <div>404 page not found</div>
    <Link to="/">Back To Home Page</Link>
    </div>
  )
}
