import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class componentName extends Component {
  render() {
    return (
      <footer className="footer" id="footer">
        <div className="footer-grid">
          <ul className="footer-ul-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
          <ul className="footer-ul-2">
            <li>shakzaken@gmail.com</li>
            <li>http://shakapps.com</li>
          </ul>
        </div>
      </footer>
    )
  }
}
