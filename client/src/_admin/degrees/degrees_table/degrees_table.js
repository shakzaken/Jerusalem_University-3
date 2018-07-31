import React, { Component } from "react";
import DegreeRow from '../degree_row/degree_row';
import PropTypes from 'prop-types';
import { getDegrees,deleteDegree } from '../../../__actions/degrees_actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class degrees extends Component {

  constructor(props){
    super(props);
    this.deleteDegree = this.deleteDegree.bind(this);
  }

  componentDidMount(){
    this.props.getDegrees();
  }

  deleteDegree(id){
    if(!this.props.isAdmin){
      const errMsg = document.querySelector('.admin-table-error-message');
      errMsg.style.display = "inline-block";
      setTimeout(()=>{
        errMsg.style.display = "none";
      },3000);
      window.location.assign("#admin-main-block");
      return;
    }
    if(!window.confirm('Are you sure you want to delete this degree?')) return;
    this.props.deleteDegree(id, () => this.props.getDegrees());
  }


  render() {
    const DegreesRows = this.props.degrees.map(degree =>
      <DegreeRow 
        key={degree.id} 
        degree={degree} 
        deleteDegree = {this.deleteDegree} 
        />
    );
    return (
      <div className="admin-table admin-degrees-table">
        <div className="admin-degrees-table-header">
          <h2 className="admin-form-header admin-form-header-fix">Academic Degrees Table</h2>
          <Link to="/admin/degrees/add" className="admin-degrees-table-icon">
             <i className="fas fa-plus-circle "></i>
          </Link>
          <div className="admin-table-error-message">You are not allowed to perform this action</div>
        </div>
        <table>
          <thead>
            <tr>
              <th className="admin-table-small-col">Image</th>
              <th className="admin-table-medium-col ">Name</th>
              <th className="admin-table-small-col">Id</th>
              <th className="admin-table-small-col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {DegreesRows}
          </tbody>
        </table>
      </div>
    );
  }
}


degrees.propTypes = {
  getDegrees : PropTypes.func.isRequired,
  degrees: PropTypes.array.isRequired
}

function mapStateTopProps(state){
  return {
    degrees: state.degrees.degreesList,
    isAdmin: state.auth.isAdmin
  };
}

export default connect(mapStateTopProps,{getDegrees,deleteDegree})(degrees);