import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({
    title,
    route,
    className,
    onClick
}){
  return (
        <Link to={`${route}`} replace >
         <button className={`${className}`} onClick={onClick}>{title}</button>
        </Link>
    )
}
