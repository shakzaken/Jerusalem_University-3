import React, { Component } from 'react';
import '../users.css';
import '../../../css/users.css';

export default class register extends Component {
  render() {
    return (
      <div className="register-body">
        <div className="register-card">
          <div className="register-card-header">
            <h3>Register</h3>
          </div>
          <div className="register-form">
            <form>
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input type="text" className="userForm" name="first_name" />
              </div>
              <div className="err-msg userForm-first_name-err"></div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input type="text" className="userForm" name="last_name" />
              </div>
              <div className="err-msg userForm-last_name-err"></div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="userForm" name="email" />
              </div>
              <div className="err-msg userForm-email-err"></div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="userForm" name="password" />
              </div>
              <div className="err-msg userForm-password-err"></div>
              <div className="form-group">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input type="password" className="userForm" name="confirm_password" />
              </div>
              <div className="err-msg userForm-confirm_password-err"></div>
              <div className="form-group-large">
                <div>
                  <label htmlFor="">Image</label>
                  <label htmlFor="user-image" className="register-file-input"><i className="fas fa-cloud-upload-alt img-icon"></i></label>
                  <input type="file" id="user-image" className="userForm image-input" name="image" />
                </div>
                <div>
                  <img src="" alt="" className="show-image" />
                </div>
              </div>
              <div className="err-msg userForm-image-err"></div>
              <input type="button" value="Register" className="register-form-button userForm-btn" />
            </form>
          </div>
          <div className="register-card-footer">
            <p>Jerusalem University</p>
          </div>
        </div>
      </div>
    )
  }
}





