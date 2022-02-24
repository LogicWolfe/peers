import React from 'react';
import { Grid } from 'semantic-ui-react';
import Student from '../data/Student'
import Feedback from './Feedback';
import Students from './Students'

interface PeerReviewsProps {
  data: {}
}

class PeerReviews extends React.Component<PeerReviewsProps> {
  state: { students: Student[], selectedStudent: Student}
  constructor(props: PeerReviewsProps) {
    super(props);
    const students = Student.all();
    this.state = {
      students: students,
      selectedStudent: students[0]
    }
  }

  selectStudent = (name: string) => {
    this.setState({
      selectedStudent: Student.fromName(name)
    })
  }

  render() {
    return (
      <Grid textAlign='left' divided padded >
        <Grid.Row>
          <Grid.Column width={3}><Students selectStudentFn={ this.selectStudent } students={ this.state.students }/></Grid.Column>
          <Grid.Column width={13}><Feedback student={ this.state.selectedStudent }/></Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default PeerReviews