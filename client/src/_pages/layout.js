import React, { Component } from 'react';
import { Route ,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import '../App.css';
import '../css/global.css';
import Navbar from './includes/navbar/navbar';
import Footer from './includes/footer/footer';
import Home from './home/home';
import DegreePage from './degrees/degree_page';
import CoursePage from './courses/course_page';
import Login from './users/login/login';
import Register from './users/register/register';
import Students from './students/students';


 

class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/degrees/:id" component={DegreePage} />
        <Route exact path="/courses/:id" component={CoursePage} />

        <Route exact path="/students" render ={()=>(
          this.props.user.role !== 'student' ? (<Redirect to="/" />)
            : (<Students />)
        )} />
        <Footer />
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps,{})(Layout);