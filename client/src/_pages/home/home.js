import React, { Component } from 'react'
import DegreeCard from './degree_card/degree_card';
import {connect} from 'react-redux';
import {getDegrees,startLoading} from '../../__actions/degrees_actions';



class Home extends Component {

  

  componentDidMount() {
    this.props.startLoading();
    this.props.getDegrees();
  }

  render() {
    const degreesCards = this.props.degrees.map((degree) =>
      <DegreeCard key={degree.id} degree={degree} />
    );

    return (
      <div>
        <section className="home-header">
          <p className="home-header-title">In order to succeed, we must first believe that we can.<br /> Jerusalem University
          </p>
        </section>

        <section className="home-body">
          <div className="home-body-grid">
            {degreesCards}
          </div>
        </section>
      </div>
    )
  }
}


const mapStateToProps = function(state){
  return {
    degrees: state.degrees.degreesList
  };
}

export default connect(mapStateToProps,{startLoading,getDegrees})(Home);
