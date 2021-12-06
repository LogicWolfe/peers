class Student {
  public static fromName({name, studentId}: {name: string, studentId: number}) {
    return this.students[name] ||= new Student(name, studentId);
  }
  private static students: {[name: string] : Student} = {}

  constructor(name: string, studentId: number) {
    this.name = name
    this.studentId = studentId
  }

  name: string
  studentId = 0
}

export default Student