import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar_admin.css';

export default class navbar extends Component {
  render() {
    return (
      <nav className="admin-navbar">
        <h2>Admin Panel</h2>
        <ul className="admin-nav-left-ul">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/admin/about">About</Link></li>
          <li><Link to="/admin/services">Services</Link></li>
        </ul>
        <ul className="admin-nav-right-ul">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    )
  }
}
