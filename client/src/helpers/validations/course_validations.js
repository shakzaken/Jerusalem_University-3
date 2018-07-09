import { InputGroup } from './validations';


export function validateCourse(course){

  const inputGroup = new InputGroup(course);
  inputGroup.reset();
  inputGroup.name.required().length(2,255);
  inputGroup.points.required().minMax(2,100);
  inputGroup.description.required().length(2,1024);
  inputGroup.field.required().length(2,255);
  inputGroup.instructor.required().length(4,255);
  inputGroup.instructorId.required();
  inputGroup.image.required().length(100,2048576);

  
  return inputGroup.getErrors();
}