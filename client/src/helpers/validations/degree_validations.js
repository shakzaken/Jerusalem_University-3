import { InputGroup } from './validations';


export function validateDegree(degree){

  const inputGroup = new InputGroup(degree);
  inputGroup.reset();
  inputGroup.name.required().length(2,255);
  inputGroup.fullName.required().length(2,255);
  inputGroup.points.required().minMax(2,100);
  inputGroup.description.required().length(2,1024);
  inputGroup.image1.required().length(100,2048576);
  inputGroup.image2.required().length(100,2048576);
  inputGroup.image3.required().length(100,2048576);

  
  return inputGroup.getErrors();
}