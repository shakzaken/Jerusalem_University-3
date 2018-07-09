import React, { Component } from "react";
import "./private_area.css";

export default class privateArea extends Component {
  render() {
    return (
      <div>
        <section class="section-i">
          <div class="i-container">
            <div class="i-grid">
              <div class="i-image-container">
                <img
                  class="i-image"
                  src="data:image/jpeg;base64,<?php echo base64_encode($_SESSION['user']->image);?>"
                  alt=""
                />
              </div>
              <div class="i-student-text">
                <strong>Name: </strong> &nbsp; first_name last_name<br />
                <strong>Degree: </strong>&nbsp; degree->full_name<br />
                <strong>Email: </strong> &nbsp; email
              </div>
            </div>
          </div>
        </section>

        <section class="section-h">
          <div class="h-container">
            <h3 class="h-header">My Courses</h3>
            <br /> Register Now to one of our degrees, and get access to our
            courses. 
            <ul class="h-list">
              <li class="h-list-item">
                <div class="h-image-container">
                  <img
                    class="h-image"
                    src="data:image/jpeg;base64,<?php echo base64_encode($row->image);?>"
                    alt=""
                  />
                </div>
                <div class="h-text">
                  <h3>name </h3>
                  <br />
                  Instructor:&nbsp; instructor <br />
                  Status:&nbsp; status <br />
                  Grade:&nbsp; grade 
                </div>
                <div class="button">
                  <a
                    href="<?php echo URLROOT;?>/courses/<?php echo $row->course_id;?>"
                    class="h-button"
                  >
                    More Info
                  </a>
                </div>
              </li>
            </ul>
           
          </div>
        </section>
      </div>
    );
  }
}
