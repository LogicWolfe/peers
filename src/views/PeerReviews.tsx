import React, { ReactElement } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import Student from '../data/Student'
import Feedback from './Feedback';
import Students from './Students'
import LoadCSV from './LoadCSV';
import CSVParser from '../data/CSVParser';

class PeerReviews extends React.Component<{}> {
  state: { students: Student[], selectedStudent: Student}
  constructor(props: {}) {
    super(props);
    this.initializeStudents();
    const students = Student.all();
    this.state = {
      students: students,
      selectedStudent: students[0]
    };
  }

  initializeStudents = () => {
    const students = Student.all();
    this.setState({
      students: students,
      selectedStudent: students[0]
    });
  }
  selectStudent = (name: string) => {
    this.setState({
      selectedStudent: Student.fromName(name)
    })
  }
  
  fileLoaded = async (contents: string) => {
    Student.clear();
    await new CSVParser(contents).getSubmissions();
    const students = Student.all();
    this.setState({
      students: students,
      selectedStudent: students[0]
    });
  }

  render() {
    let body: ReactElement

    if (this.state.students.length > 0) {
      body = 
        <Grid.Row>
          <Grid.Column width={3}><Students selectStudentFn={ this.selectStudent } students={ this.state.students }/></Grid.Column>
          <Grid.Column width={13}>
            <Feedback student={ this.state.selectedStudent }/>
            </Grid.Column>
        </Grid.Row>  
    } else {
      body = 
        <Grid.Row textAlign='center'>
          <Grid.Column width={16}>
            <Segment placeholder>
              <Header>Import a CSV to get started.</Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>  
    }

    return (
      <Grid textAlign='left' divided padded >
        <Grid.Row>
          <Grid.Column width={16}>
            <LoadCSV fileLoaded={this.fileLoaded} />
          </Grid.Column>
        </Grid.Row>
        {body}
      </Grid>
    )
  }
}

export default PeerReviews