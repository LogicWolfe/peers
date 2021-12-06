import Student from "./Student";
import Submission from "./Submission"

interface ReviewConstructor {
  subject: Student
  reviewer: Student
  submission: Submission
  responses: string[]
}

class Review {
  public static readonly SUBJECT_NAME_OFFSET = 0
  public static readonly COMMUNICATION_OFFSET = 1
  public static readonly SUPPORTIVENESS_OFFSET = 2
  public static readonly REPORT_CONTRIBUTIONS_OFFSET = 3
  public static readonly VALUED_CONTRIBUTIONS_OFFSET = 4
  public static readonly AREAS_OF_IMPROVEMENT_OFFSET = 5

  public static fromSlice = (slice: string[], submission: Submission): Review | undefined => {
    let studentName = slice[Review.SUBJECT_NAME_OFFSET]
    return new Review({
      subject: Student.fromName(studentName),
      reviewer: submission.student,
      submission: submission,
      responses: slice
    });
  }

  readonly subject: Student
  readonly reviewer: Student
  readonly submission: Submission
  readonly responses: string[]


  constructor({subject, reviewer, submission, responses}: ReviewConstructor) {
    this.subject = subject
    this.reviewer = reviewer
    this.submission = submission
    this.responses = responses
  }

  communicationScore = () => parseFloat(this.responses[Review.COMMUNICATION_OFFSET])
  supportivenessScore = () => parseFloat(this.responses[Review.SUPPORTIVENESS_OFFSET])
  reportContributionsScore = 
    () => parseFloat(this.responses[Review.REPORT_CONTRIBUTIONS_OFFSET])
  valuedContributions = () => this.responses[Review.VALUED_CONTRIBUTIONS_OFFSET]
  areasOfImprovement = () => this.responses[Review.AREAS_OF_IMPROVEMENT_OFFSET]
}

export default Review