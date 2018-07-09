import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUsers, startLoading, deleteUser} from '../../../__actions/users_actions';
import './users_table.css';
import UserRow from '../user_row/user_row';

class users extends Component {

  constructor(){
    super();
    this.state = {
      users : [],
      loading : true
    };
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount(){
    this.props.startLoading();
    this.props.getUsers();
  }

  deleteUser(id){
    if(!window.confirm('Are you sure you want to delete this user?')) return;
    this.props.deleteUser(id, ()=> this.props.getUsers());
    
  }


  render() {
    const UsersRows = this.props.users.map(user => 
      <UserRow 
      key={user.id} 
      user ={user} 
      loading={this.props.loading} 
      deleteUser = {this.deleteUser}
      />
    );

    return (
      <div>
        <h2 className="admin-users-header">Users Table</h2>
        <table className="admin-users-table">
          <thead>
            <tr>
              <th className="admin-users-medium-col">Image</th>
              <th className="admin-users-big-col">Name</th>
              <th className="admin-users-big-col">Email</th>
              <th className="admin-users-medium-col">Role</th>
              <th className="admin-users-small-col">Id</th>
              <th className="admin-users-small-col">Delete</th>
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
    users: state.users.users
  };
}

export default connect(mapStateTopProps,{getUsers,startLoading,deleteUser})(users);