class InputObj{

  constructor(key,value,componentRef){
      this.key = key;
      this.valid = true;
      this.value = value;
      this.err = '';
      this.properName = this.changeString(this.key);

  }

  required(){
      if(!this.valid) { return this; }
      if (this.value ==="" || this.value === undefined || this.value === null){
          this.err = `${this.properName} is required`;
          this.valid = false;
      }
      return this;
  }

  minMax(min,max){
      if(!this.valid) { return this; }
      if(!Number(this.value) || this.value < min || this.value > max ){
          this.err = `${this.properName} should be between ${min} to ${max}`;
          this.valid = false;
      }
      return this;
  }
  length(min,max){
      if(!this.valid) { return this; }
      if( Number(this.value) ) {
          this.value = ''+this.value;
      }
      if(this.value.length < min || this.value.length > max){
          this.err = `${this.properName} length should be between ${min} to ${max}`;
          this.valid = false;
      }
      return this;
  }
  isNumber(){
      if(!this.valid) { return this; }
      if(!Number(this.value)){
          this.err = `${this.properName} is not a number`;
          this.valid = false;
      }  
      return this;  
  }
  isEmail(){
      if(!this.valid) { return this; }
      const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      if(!re.test(this.value)){
          this.err = `Email is not valid`;
          this.valid = false;
      }
      return this;
  }

  imageSize(){
      if(!this.valid)  return this; 
      if(this.value.size > 1048576){
          this.err = `Image size is to large`;
          this.valid = false;
      }
      return this;
  }
  

  isValid(){
      return this.valid;
  }

  changeString(name){
      
      let char = name.charAt(0).toUpperCase();
      name = name.substr(1);
      let result = char+name;
      return result.replace('_',' ');
  }

  
  
 
}// end class

export  class InputGroup{

  constructor(group){
      for (let key in group){
        this[key] = new InputObj(key,group[key]);
      } 
      
  }

  addProp(key,value){
    this[key] = new InputObj(key,value);
  }

  reset(){
      for(let key in this){
          this[key].valid = true;
          this[key].err= '';
      }
  }

  isValid(){
      let flag = true;
      for(let key in this){
          flag = flag && this[key].isValid();
      }
      return flag;
  }

  
  getValues(){
      let result = {};
      for(let element in this){
          result[this[element].key] = this[element].value;
      }
      return result;
  }
  getErrors(){
    let result = {};
    for(let element in this){
      if(this[element].valid === false){
        result[this[element].key] = this[element].err;
      }   
    }
    return result;
}

  getFormData(){
      let result = new FormData();
      for(let element in this){
          result.append(this[element].name,this[element].value);
      }
      return result; 
  }

  validPasswords(){
      if(this.password.value !== this.confirmPassword.value){
          this.password.err = 'Passwords do not match';
          this.password.valid = false;
      }
  }

}