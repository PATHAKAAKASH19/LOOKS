import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../ui/container/Container'

export default function ProductCard({route, data}) {
  return (
     
        <Link className="link1" to={`${route}`} state={data}>
          <Container className="child">
            <Container className="img">
              <img src={data.productImgUrls[0]} alt={data.category} />
            </Container>
            <h2>{data.name}</h2>
          </Container>
        </Link>
      
  )
}
