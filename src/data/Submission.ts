import Student from "./Student"
import Answer from "./Answer"
import Review from "./Review"

class Submission {
  public static readonly TIMESTAMP_INDEX = 0
  public static readonly STUDENT_NAME_INDEX = 1
  public static readonly STUDENT_NUMBER_INDEX = 2
  
  public static readonly REVIEW_LENGTH = 6
  public static readonly FIRST_REVIEW_QUESTION_INDEX = 4
  public static readonly MAXIMUM_REVIEWS = 7
  // This is an array of start and end indexes for the multiple
  // reviews included in a given row.
  public static readonly REVIEW_RANGES:number[][] = 
    Array(this.MAXIMUM_REVIEWS).fill(undefined).map((_, i) => {
      return [ 
        (Submission.FIRST_REVIEW_QUESTION_INDEX+i+i*Submission.REVIEW_LENGTH),
        (Submission.FIRST_REVIEW_QUESTION_INDEX-1+i+(i+1)*Submission.REVIEW_LENGTH)
      ]
    }) as unknown as number[][]
    
  constructor(row: string[]) {
    this.row = row;
    this.createdAt = this.createdAtFromRow()
    this.student = this.studentFromRow()
    this.answers = this.answersFromRow()
    this.reviews = this.reviewsFromRow()
    console.log("Submission", this);
  }
  row: string[]
  createdAt: Date
  student: Student
  answers: Answer[]
  reviews: Review[]

  private createdAtFromRow = (): Date => {
    return new Date(Date.parse(this.row[Submission.TIMESTAMP_INDEX]));
  }

  private studentFromRow = (): Student => {
    return Student.fromName(
      this.row[Submission.STUDENT_NAME_INDEX],
      parseInt(this.row[Submission.STUDENT_NUMBER_INDEX], 10)
    )
  }

  private answersFromRow = (): Answer[] => {
    return [];
    console.log(this.row);
    return this.row.map((answer, i) => {
      return new Answer({
        text: answer, 
        questionIndex: i, 
        submission: this
      })
    })
  }

  private reviewsFromRow = (): Review[] => {
    return Submission.REVIEW_RANGES.map((range: number[]): Review | undefined => {
      return Review.fromSlice(this.row.slice(range[0], range[1]), this)
    }).filter(n => typeof(n) !== 'undefined') as Review[]
  }
}

export default Submission