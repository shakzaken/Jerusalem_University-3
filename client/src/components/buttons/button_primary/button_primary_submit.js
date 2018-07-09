import React from 'react';
import './button_primary.css';

export default (props) => {
  return (
    <button 
    type="submit" 
    className="button-primary">
      {props.value}
    </button>
  )
}