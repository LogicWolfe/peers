import React from 'react';
import Student from '../data/Student'
import FeedbackView from './FeedbackView';
import Students from './Students'

interface PeerReviewsProps {
  data: {}
}

class PeerReviews extends React.Component<PeerReviewsProps> {
  render() {
    return (
      <div>
        <Students students={Student.all()}/>
        <FeedbackView student={ Student.all()[0] }></FeedbackView>
      </div>
    )
  }
}

export default PeerReviews