import React from 'react';
import Student from '../data/Student'
import StudentView from './StudentView'

interface StudentsProps {
  students: Student[]
}

class Students extends React.Component<StudentsProps> {
  render() {
    const studentViews = this.props.students.map((student) => {
      return <StudentView student={student}></StudentView>
    });
    return (
      <div>
        {studentViews}
      </div>
    )
  }
}

export default Students