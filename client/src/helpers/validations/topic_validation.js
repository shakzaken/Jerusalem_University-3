import { InputGroup } from './validations';


export function validateTopic(topic){

  const inputGroup = new InputGroup(topic);
  inputGroup.reset();
  inputGroup.name.required().length(2,255);
  
  
  return inputGroup.getErrors();
}