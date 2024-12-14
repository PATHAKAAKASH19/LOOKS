import React from 'react'
import { Link } from 'react-router-dom'

export default function Cards({
    image,
    route,
    type
}) {


  
 
  
  return (
      <Link className="link1" to={`${route}`}>
         {type==="category" &&(<div className='container'>
          
            <img src={image.imgUrl} alt={image.category}/>
            
            <h2>{image.category.toUpperCase()}</h2>
            
          </div>)}

          {
            type==="productList" && (
              <div className='product'>
                
                 <img src={image[0].productImgUrls[0]} alt={image[0].category} />
              
                <h2>
                   {image[0].name}
                </h2>
 
                
                <h2>
                  INR  {image[0].price}
                </h2>

                 <ul className='sizes'>
                 {image[0].sizes.map((size, index) => {
                  return (
                    <li key={index}>{size}</li>
                  )
                 })}
                 </ul>
                
              </div>
            )
          }

      </Link>
  )
}
