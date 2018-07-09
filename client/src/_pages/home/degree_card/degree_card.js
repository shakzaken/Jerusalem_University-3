import React, { Component } from 'react';
import ButtonPrimary from '../../../components/buttons/button_primary/button_primary';
import './degree_card.css';


export default class degreeCard extends Component {
  render() {
    
    return (
      <div className="home-card">
        <div className="home-card-container">
          <img className="home-card-image" src={this.props.degree.images.body1} alt="" />
        </div>
        <div className="home-card-body">
          <p className="home-card-header">{this.props.degree.name}</p>
          <p className="home-card-text">{this.props.degree.full_name}</p>
          <div className="home-card-button">
             <ButtonPrimary to={`/degrees/${this.props.degree.id}`} value="More Details" />
          </div>
        </div>
      </div>
    )
  }
}
