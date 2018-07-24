import React, { Component } from "react";


export default class image extends Component {

  constructor(props){
    super(props);
    this.state = {
      image:''
    }

    this.handleChange = this.handleChange.bind(this);
    this.showImage = this.showImage.bind(this);
  }

  componentDidMount(){
    if(this.props.color === 'primary'){
      let icon = document.querySelector('.image-input-icon');
      icon.style.color = '#12d8fa';
    }
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
        <div className="image-input-group">
          <div>
            <label className="image-input-text" htmlFor="">{this.props.label}</label>
            <label htmlFor={this.props.id} className="image-label">
              <i className="fas fa-cloud-upload-alt image-input-icon" />
            </label>
            <input
              type="file"
              id={this.props.id}
              className="image-input-element"
              name={this.props.name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <img 
              src={this.state.image} 
              alt=''
              className = {this.state.image ? "image-input-show": "image-input-hide"}
              />
          </div>
        </div>
        <div className="image-input-err err-msg">
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