import React from 'react';
import './header_secondary.css';

export default (props) => {
  return (
    <h2 className = "header-secondary">
      {props.value}
    </h2>
  )
}
