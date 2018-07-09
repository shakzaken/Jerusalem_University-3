export function validateImage(file){
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

export function showImage(event,self){
    const name = event.target.name;
    const file = event.target.files[0];
    if(!validateImage(file)){
      console.log("not valid");
      self.setState({[name]: null});
      return false;
    } 
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload =  function(){ 
      self.setState({
        [name]: file,
        [name+'Str'] : reader.result
      });
    } 
}
