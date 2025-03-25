import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Container from '../../components/ui/container/Container'
import {Link} from "react-router-dom"

export default function OrderPage() {
  

 const searchQuery =  useSearchParams()[0]
 const referenceNo = searchQuery.get("reference")

  return (
    <Container className="order-page">
        <Container className="order-page-box">
        <h1>ORDER SUCCESSFULL</h1>
        <h2>Reference no.{referenceNo}</h2>
        </Container>
         <Link to='/' className='order-page-link'>
         <h2>Continue shoping</h2>
         </Link>
    </Container>
  
  )
}
