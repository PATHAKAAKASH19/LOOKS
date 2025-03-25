import React from 'react'
import ReactDOM from 'react-dom'

export default function FilterPortal({children, isOpen, onClose}){

    if(!isOpen) return null;
  return  ReactDOM.createPortal(
   
    <div className='filter-container'>
      <button
        onClick={onClose}
      >
       close
      </button>
      {children}
    </div>,
 
  document.getElementById("filter-portal")

  );
  
};
