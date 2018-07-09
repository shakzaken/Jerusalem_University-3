import React from 'react';
import {Link} from 'react-router-dom';
import './button_primary.css';

export default (props) => {
  return (
    <Link 
    to={props.to} 
    className="button-primary">
      {props.value}
    </Link>
  )
}
