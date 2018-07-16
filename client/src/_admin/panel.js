import React, { Component } from "react";
import "./admin.css";
import { Route,Switch } from "react-router-dom";
import Navbar from "./includes/navbar/navbar_admin";
import Sidebar from "./includes/sidebar/sidebar_admin";
import Header from "./includes/header/header_admin";
import UsersTable from "./users/users_table/users_table";
import UserForm from "./users/user_form/user_form";
import Courses from "./courses/courses_table/courses_table";
import AddCourse from "./courses/course_form/course_form";
import Comments from "./comments/comments";
import DegreesTable from "./degrees/degrees_table/degrees_table";
import DegreeForm from "./degrees/degree_form/degree_form";
import DegreeInfo from './degrees/degree_info/degree_info';
import CourseInfo from './courses/course_info/course_info';

export default class panel extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="admin-grid">
          <Sidebar />
          <div className="admin-main">
            <div className="admin-container">
              <Header />
            </div>
            <div className="admin-main-block">
              <Switch>
                <Route exact path="/admin/users/add" component={UserForm} />
                <Route exact path="/admin/users" component={UsersTable} />

                <Route exact path="/admin/degrees/add" component={DegreeForm} />
                <Route exact path="/admin/degrees/:id" component={DegreeInfo} />
                <Route exact path="/admin/degrees" component={DegreesTable} />
                
                <Route exact path="/admin/courses" component={Courses} />
                <Route exact path="/admin/courses/add" component={AddCourse} />
                <Route exact path="/admin/courses/:id" component={CourseInfo} />
                <Route path="/admin/comments" component={Comments} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
