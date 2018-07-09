import React, { Component } from 'react'

export default class componentName extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-grid">
          <ul className="footer-ul-1">
            <li><a href="<?php echo URLROOT;?>">Home</a></li>
            <li><a href="<?php echo URLROOT;?>/admin">Admin</a></li>
            <li><a href="<?php echo URLROOT;?>/users/login">Login</a></li>
            <li><a href="<?php echo URLROOT;?>/users/register">Register</a></li>
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
