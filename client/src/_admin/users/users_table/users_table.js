import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUsers, deleteUser} from '../../../__actions/users_actions';
import {Link} from 'react-router-dom';
import UserRow from '../user_row/user_row';

class users extends Component {

  constructor(){
    super();
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount(){
    this.props.getUsers();
  }

  deleteUser(id){

    if(!this.props.isAdmin){
      const errMsg = document.querySelector('.admin-table-error-message');
      errMsg.style.display = "inline-block";
      setTimeout(()=>{
        errMsg.style.display = "none";
      },3000);
      window.location.assign("#admin-main-block");
      return;
    }
    if(!window.confirm('Are you sure you want to delete this user?')) return;
    this.props.deleteUser(id, ()=> this.props.getUsers());
    
  }


  render() {
    const UsersRows = this.props.users.map(user => 
      <UserRow 
      key={user.id} 
      user ={user} 
      deleteUser = {this.deleteUser}
      />
    );

    return (
      <div className="admin-table admin-users-table">
        <div className="admin-users-table-header">
          <h2 className="admin-form-header admin-form-header-fix">Users Table</h2>
          <Link to="/admin/users/add" className="admin-users-table-icon">
             <i class="fas fa-plus-circle "></i>
          </Link>
          <div className="admin-table-error-message">You are not allowed to perform this action</div>
        </div>
        <table>
          <thead>
            <tr>
              <th className="admin-table-medium-col">Image</th>
              <th className="admin-table-big-col">Name</th>
              <th className="admin-table-big-col hide-on-phone">Email</th>
              <th className="admin-table-medium-col">Role</th>
              <th className="admin-table-small-col hide-on-phone">Id</th>
              <th className="admin-table-small-col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {UsersRows}
          </tbody>
        </table>
      </div>
    )
  }
}


users.propTypes = {
  getUsers : PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
}

function mapStateTopProps(state){
  return {
    users: state.users.users,
    isAdmin: state.auth.isAdmin
  };
}

export default connect(mapStateTopProps,{getUsers,deleteUser})(users);