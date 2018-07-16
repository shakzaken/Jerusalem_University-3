import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class sidebar extends Component {
  render() {
    return (
      <aside className="admin-sidebar">
        <p className="admin-sidebar-header">Hello Admin</p>
        <div className="admin-logo">
          <img
            className="admin-pic"
            src="/img/main/admin.jpeg"
            alt="admin"
          />
        </div>
        <ul className="admin-links">
          <li>
            <Link to="/admin/users">View All Users</Link>
          </li>
          <li>
            <Link to="/admin/users/add">Add User</Link>
          </li>
          <li>
            <Link to="/admin/degrees">View All Degrees</Link>
          </li>
          <li>
            <Link to="/admin/degrees/add">Add Degree</Link>
          </li>
          <li>
            <Link to="/admin/courses">View All Courses</Link>
          </li>
          <li>
            <Link to="/admin/courses/add">Add Course</Link>
          </li>
          <li>
            <Link to="/admin/comments">View All Comments</Link>
          </li>
        </ul>
      </aside>
    );
  }
}
