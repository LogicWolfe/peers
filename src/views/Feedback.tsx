import React from 'react';
import Student from '../data/Student'
import { Header, Message } from 'semantic-ui-react'

interface FeedbackProps {
  student: Student
}

class Feedback extends React.Component<FeedbackProps> {
  render() {
    const valuedContributions = this.props.student.valuedContributions().map(
      (feedback) => <Message.Item>{feedback}</Message.Item>
    )
    
    const areasOfImprovement = this.props.student.areasOfImprovement().map(
      (feedback) => <Message.Item>{feedback}</Message.Item>
    )

    return (
      <div>
        <Header as="h1">{this.props.student.name}</Header>
        <Message>
          <Message.Content>Reviewers: {this.props.student.reviewedBy()}</Message.Content>
        </Message>

        <Header as="h2">The Digital Economy – Team Report Peer Feedback</Header>

        <p>
          This rubric provides a summary of feedback from your peers (averaged).
          It covers your communication; how effectively you supported your team 
          members; and your contributions to the research, writing, editing, and
          publishing.
        </p>

        <p>
          If you have concerns about the marks or feedback you’ve received, please
          contact your unit coordinator.
          {' '}
          <strong>
            Do not directly contact your team members about your peer marks or feedback.
          </strong>
        </p>

        <p>
          Your overall mark for communication was: { this.props.student.communicationScore().toPrecision(2) } / 4
          <br/>
          Your overall mark for supportiveness was: { this.props.student.supportivenessScore().toPrecision(2) } / 6
          <br/>
          Your overall mark for report contributions was: { this.props.student.reportContributionsScore().toPrecision(2) } / 10
          <br/>
          <br/>
          This means that your overall mark for your individual contributions to the
          team report was: { this.props.student.totalScore().toPrecision(3) } / 20
        </p>

        <Message>
          <Message.Header>Contributions your team members valued included:</Message.Header>
          <Message.List>
            { valuedContributions }
          </Message.List>
        </Message>

        <Message>
          <Message.Header>Areas you might work on include:</Message.Header>
          <Message.List>
            { areasOfImprovement }
          </Message.List>
        </Message>
      </div>
    )
  }
}

export default Feedback