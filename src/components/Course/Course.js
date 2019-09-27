import React from 'react';
import 'rbx/index.css';
import { Button } from 'rbx';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { timeParts, hasConflict, getCourseNumber, getCourseTerm} from './times';

const firebaseConfig = {
  apiKey: "AIzaSyA1z7dySNbIopqD8t0HORwwkMKi8A1Ul1Q",
  authDomain: "react101-bc11e.firebaseapp.com",
  databaseURL: "https://react101-bc11e.firebaseio.com",
  projectId: "react101-bc11e",
  storageBucket: "react101-bc11e.appspot.com",
  messagingSenderId: "918554075044",
  appId: "1:918554075044:web:e28d06119fb1873ee0eb31"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const moveCourse = course => {
  const meets = prompt('Enter new meeting data, in this format:', course.meets);
  if (!meets) return;
  const {days} = timeParts(meets);
  if (days) saveCourse(course, meets); 
  else moveCourse(course);
};

const saveCourse = (course, meets) => {
  db.child('courses').child(course.id).update({meets})
    .catch(error => alert(error));
};

const buttonColor = selected => (
  selected ? 'success' : null
);

const Course = ({ course, state, user }) => (
  <Button color={ buttonColor(state.selected.includes(course)) }
    onClick={ () => state.toggle(course) }
    onDoubleClick={ user ? () => moveCourse(course) : null }
    disabled={ hasConflict(course, state.selected) }
    >
    { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
  </Button>
);

export default Course;