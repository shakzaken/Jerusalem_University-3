import React, { Component } from "react";
import DegreeRow from '../degree_row/degree_row';
import PropTypes from 'prop-types';
import { getDegrees,startLoading ,deleteDegree } from '../../../__actions/degrees_actions';
import {connect} from 'react-redux';


class degrees extends Component {

  constructor(){
    super();
    this.deleteDegree = this.deleteDegree.bind(this);
  }

  componentDidMount(){
    this.props.startLoading();
    this.props.getDegrees();
  }

  deleteDegree(id){
    if(!window.confirm('Are you sure you want to delete this degree?')) return;
    this.props.deleteDegree(id, () => this.props.getDegrees());
  }


  render() {
    const DegreesRows = this.props.degrees.map(degree =>
      <DegreeRow 
        key={degree.id} 
        degree={degree} 
        loading={this.props.loading} 
        deleteDegree = {this.deleteDegree} 
        />
    );
    return (
      <div className="admin-table">
        <div className="admin-degrees-table-header">
          <h2 className="admin-form-header admin-form-header-fix">Academic Degrees Table</h2>
        </div>
        <table >
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
    degrees: state.degrees.degreesList
  };
}

export default connect(mapStateTopProps,{getDegrees,startLoading, deleteDegree})(degrees);