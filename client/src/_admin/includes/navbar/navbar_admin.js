import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class navbar extends Component {
  render() {
    return (
      <nav className="admin-navbar">
        <h2>Admin Panel</h2>
        <ul className="admin-navbar-ul-left">
          <li className="admin-navbar-list-item">
            <Link className="admin-navbar-link" to="/">Home</Link>
          </li>
          <li className="admin-navbar-list-item">
            <Link className="admin-navbar-link" to="/admin/about">About</Link>
          </li>
          <li className="admin-navbar-list-item">
            <Link className="admin-navbar-link" to="/admin/services">Services</Link>
          </li>
        </ul>
      </nav>
    )
  }
}
