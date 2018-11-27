// BEGIN-SNIPPET object-of-person-type
// file in app/types/object-of-person.js
import { ObjectType } from '@microstates/ember';
import Person from './person';

export default ObjectType.of(Person); 
// END-SNIPPET