import React from 'react';
import Student from '../data/Student'

interface StudentProps {
  student: Student
}

class StudentView extends React.Component<StudentProps> {
  render() {
    return (
      <div>
        <a href="#">{this.props.student.name}</a>
      </div>
    )
  }
}

export default StudentView