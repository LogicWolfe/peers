class Student {
  public static fromName(name: string, studentId?: number) {
    const student = this.students[name] ||= new Student(name, studentId)
    if (!student.studentId && studentId) {
        student.studentId = studentId
    }
    return student
  }
  private static students: {[name: string] : Student} = {}

  constructor(name: string, studentId?: number) {
    this.name = name
    this.studentId = studentId
  }

  name: string
  studentId: number | undefined
}

export default Student