import React from 'react';
import { List, Button } from 'semantic-ui-react';
import Student from '../data/Student'


interface StudentsProps {
  students: Student[]
  selectStudentFn: (name: string) => void
}
      
class Students extends React.Component<StudentsProps> {
  state: { selected: string }

  constructor(props: StudentsProps) {
    super(props);
    this.state = {
      selected: props.students[0].name
    }
  }
  selectStudent = (event: React.MouseEvent) => {
    const name = event.currentTarget.getAttribute("data-name");
    if (name) {
      this.setState({
        selected: name
      })
      this.props.selectStudentFn(name);
    }
  }
  
  render() {
    const studentListItems = this.props.students.map((student) => {
      return <List.Item>
        <Button fluid color={this.state.selected === student.name ? 'green' : 'grey'} data-name={student.name} onClick={this.selectStudent}>{student.name}</Button>
      </List.Item>
    });
    return (
      <List>
        {studentListItems}
      </List>
    )
  }
}

export default Students