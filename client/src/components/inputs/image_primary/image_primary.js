import React, { Component } from "react";
import '../input_shared.css';
import './image_primary.css';


export default class image extends Component {

  constructor(props){
    super(props);
    this.state = {
      image:''
    }

    this.handleChange = this.handleChange.bind(this);
    this.showImage = this.showImage.bind(this);
  }

  handleChange(event){
    this.showImage(event);
  }

  showImage(event){
    const file = event.target.files[0];
    if(!validateImage(file)){
      this.setState({ image: ''});
      return false;
    } 
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload =  () =>{ 
      this.setState({
        image : reader.result
      });
      this.props.setImage(reader.result);
    }
  }


  render() {
    return (
      <div>
        <div className="form-group-large">
          <div>
            <label htmlFor="">{this.props.label}</label>
            <label htmlFor={this.props.id} className="file-input">
              <i className="fas fa-cloud-upload-alt img-icon" />
            </label>
            <input
              type="file"
              id={this.props.id}
              className="image-input"
              name={this.props.name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <img 
              src={this.state.image} 
              alt=''
              className = {this.state.image ? "show-image": "show-image hidden"}
              />
          </div>
        </div> 
        <div className="err-msg">
          {this.props.error ? this.props.error : ""}
        </div>
      </div>
    );
  }
}


function validateImage(file){
  if(!file) return false;
  if(!file.type) return false;
  const t = file.type.split('/').pop().toLowerCase();
  if (t !== "jpeg" && t !== "jpg" && t !== "png" && t !== "bmp" && t !== "gif") {
      return false;
  }
  if (file.size > 1024000) {
      return false;
  }
  return true;
}