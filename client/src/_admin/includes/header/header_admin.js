import React from 'react';
import { Link } from 'react-router-dom';
import './header_admin.css';

export default () => {
  return (
    <div className="admin-header">
      <Link to="/admin/users" className="admin-header-pic1">
        Users <br />
        <i className="fas fa-users admin-header-icon"></i>
      </Link>
      <Link to="/admin/degrees" className="admin-header-pic2">
        Degrees <br />
        <i className="fas fa-graduation-cap admin-header-icon"></i>
      </Link>

      <Link to="/admin/courses" className="admin-header-pic3">
        Courses <br />
        <i className="fas fa-book admin-header-icon"></i>
      </Link>

      <Link to="/admin/comments" className="admin-header-pic4">
        Comments <br />
        <i className="fas fa-comment-alt admin-header-icon"></i>
      </Link>
    </div>
  )
}
