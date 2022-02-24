import React from 'react';
import Student from '../data/Student'

interface FeedbackProps {
  student: Student
}

class FeedbackView extends React.Component<FeedbackProps> {
  render() {
    const valuedContributions = this.props.student.valuedContributions().map(
      (feedback) => <li>{feedback}</li>
    )
    
    const areasOfImprovement = this.props.student.areasOfImprovement().map(
      (feedback) => <li>{feedback}</li>
    )

    return (
      <div>
        <h2>The Digital Economy – Team Report Peer Feedback</h2>

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
          team report was: { this.props.student.totalScore().toPrecision(2) } / 20
        </p>

        Contributions your team members valued included:
        <ul>
          { valuedContributions }
        </ul>

        Areas you might work on include:
        <ul>
          { areasOfImprovement }
        </ul>
      </div>
    )
  }
}

export default FeedbackView