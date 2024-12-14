import React from 'react'


export default function Title({className,reactIcon, title}) {
  return (
    <h2 className={className}>{reactIcon}{title}</h2>
  )
}
