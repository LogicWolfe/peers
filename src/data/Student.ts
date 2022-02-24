import Review from "./Review"

class Student {
  public static fromName(name: string, studentId?: number) {
    if (!this.students[name]) {
      this.students[name] = new Student(name, studentId)
    }
    const student = this.students[name]
    if (!student.studentId && studentId) {
        student.studentId = studentId
    }
    return student
  }
  private static students: {[name: string] : Student} = {}

  public static all(): Student[] {
    return Object.values(this.students).sort((a, b) => (a.name < b.name) ? -1 : 1)
  }

  public static clear() {
    console.log("Cleared students");
    this.students = {};
  }

  constructor(name: string, studentId?: number) {
    this.name = name
    this.studentId = studentId
  }

  addReview(review: Review) {
    this.reviews.push(review);
  }
  
  readonly name: string
  studentId: number | undefined
  readonly reviews: Review[] = []

  supportivenessScore() {
    let sum: number = 0
    this.reviews.forEach(r => sum += r.supportivenessScore())
    return sum / this.reviews.length
  }

  communicationScore() {
    let sum: number = 0
    this.reviews.forEach(r => sum += r.communicationScore())
    return sum / this.reviews.length
  }

  reportContributionsScore() {
    let sum: number = 0
    this.reviews.forEach(r => sum += r.reportContributionsScore())
    return sum / this.reviews.length
  }

  totalScore() {
   return this.communicationScore() + this.supportivenessScore() + this.reportContributionsScore()
  }
  
  valuedContributions() {
    return this.reviews.map(
      (r) => r.valuedContributions()).filter(Boolean).sort( () => .5 - Math.random()
    )
  }

  areasOfImprovement() {
    return this.reviews.map(
      (r) => r.areasOfImprovement()).filter(Boolean).sort( () => .5 - Math.random()
    )
  }

  reviewedBy() {
    return this.reviews.map(
      (r) => r.reviewer.name
    ).join(', ');
  }
}

export default Student