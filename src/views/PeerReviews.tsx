import React from 'react';

interface PeerReviewsProps {
  data: {}
}

class PeerReviews extends React.Component<PeerReviewsProps> {
  render() {
    return (
      <p>
        Hello<br />
        {JSON.stringify(this.props.data)}
      </p>
    )
  }
}

export default PeerReviews