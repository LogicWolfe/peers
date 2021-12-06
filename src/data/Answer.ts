import Submission from "./Submission";

class Answer {
  constructor({text, questionIndex, submission}: 
      {text: string, questionIndex: number, submission: Submission}) {
    this.text = text;
    this.questionIndex = questionIndex;
    this.submission = submission;
  }
  readonly text: string 
  readonly questionIndex: number
  readonly submission: Submission
}

export default Answer