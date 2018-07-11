import React from 'react';
import './button_secondary.css';

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
