import React from 'react'




export default function Container({className, children}) {
  return (
    <div className={className} >
       {children}
     </div>
  )
}
