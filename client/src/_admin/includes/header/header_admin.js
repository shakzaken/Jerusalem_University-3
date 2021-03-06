import React from 'react';
import { Link } from 'react-router-dom';


export default () => {
  return (
    <div className="admin-header">
      <Link to="/admin/users" 
        className="admin-header-picture admin-header-picture-one">
        Users <br />
        <i className="fas fa-users admin-header-icon"></i>
      </Link>
      <Link to="/admin/degrees" 
        className="admin-header-picture admin-header-picture-two">
        Degrees <br />
        <i className="fas fa-graduation-cap admin-header-icon"></i>
      </Link>

      <Link to="/admin/courses" 
        className="admin-header-picture admin-header-picture-three">
        Courses <br />
        <i className="fas fa-book admin-header-icon"></i>
      </Link>

      <Link to="/admin/comments" 
        className="admin-header-picture admin-header-picture-four">
        Comments <br />
        <i className="fas fa-comment-alt admin-header-icon"></i>
      </Link>
    </div>
  )
}
