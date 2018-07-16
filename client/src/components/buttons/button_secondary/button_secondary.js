import React from 'react';

export default (props) => {
  return (
    <button 
      className="button-secondary"
      onClick = {props.handleClick}
    >
      {props.name}
      
    </button>
  )
}
