import React from 'react';

export default (props) => {
  return (
    <button 
    type="submit" 
    className="button-primary">
      {props.value}
    </button>
  )
}