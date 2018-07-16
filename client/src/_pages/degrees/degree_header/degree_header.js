import React, { Component } from 'react';

export default class DegreeHeader extends Component {
  render() {

    const loading = this.props.loading;

    return (
      <div className="degree-header">
        <div className="degree-header-container degree-header-container-1">
          <img 
            src={loading ? '': this.props.degree.images.body1} 
            alt=""
            class="degree-header-image" 
            />
        </div>
        <div className="degree-header-container degree-header-container-2">
          <img 
            src={loading ? '': this.props.degree.images.body2} 
            alt=""
            class="degree-header-image" 
          />
        </div>
        <div className="degree-header-container degree-header-container-3">
          <img 
            src={loading ? '': this.props.degree.images.body3} 
            alt="" 
            class="degree-header-image" />
        </div>
      </div>
    )
  }
}
