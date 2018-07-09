import React from 'react';
import './header_primary.css';

export default (props) => {
  return (
    <h2 className = "header-primary">
      {props.value}
    </h2>
  )
}
