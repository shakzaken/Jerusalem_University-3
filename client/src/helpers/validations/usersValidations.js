
import { InputGroup } from './validations';


export  function validateUser(user){
  
  const inputGroup = new InputGroup(user);
  inputGroup.reset();
  inputGroup.firstName.required().length(2,255);
  inputGroup.lastName.required().length(2,255);
  inputGroup.role.required().length(2,255);
  inputGroup.email.required().length(2,255).isEmail();
  inputGroup.password.required().length(4,100);
  inputGroup.confirmPassword.required().length(4,100);
  inputGroup.image.required().length(100,2048576);

  if(inputGroup.isValid()) {
      inputGroup.validPasswords();
  }
  return inputGroup.getErrors();
}


export  function validateLogin(user){
  
  const inputGroup = new InputGroup(user);
  inputGroup.reset();
  inputGroup.email.required().length(2,255).isEmail();
  inputGroup.password.required().length(4,100);
  
  return inputGroup.getErrors();
}

