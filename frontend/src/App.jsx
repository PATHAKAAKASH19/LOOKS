import React from 'react'
import Footer from "./components/footer/Footer"
import Header from './components/header/Header'

import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <Header/>
        <Outlet/>
      <Footer/>
    </div>
  )
}
