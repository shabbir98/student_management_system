class Student {
  private static studentCount = 10000;
  private _id: number;
  private courses: string[];

  constructor(private _name: string, private balance: number) {
    this._id = ++Student.studentCount;
    this.courses = [];
  }

  enroll(course: string) {
    this.courses.push(course);
  }

  viewBalance(): string {
    return this.balance.toString();
  }

  payTuition(amount: number) {
    this.balance -= amount;
  }

  showStatus() {
    console.log(
      `Student ID: ${this._id}\nName: ${
        this._name
      }\nCourses Enrolled: ${this.courses.join(', ')}\nBalance: $${
        this.balance
      }`
    );
  }

  updateBalance(balance: number) {
    this.balance += balance;
  }

  public get name(): string {
    return this._name;
  }

  public get id(): number {
    return this._id;
  }
}

export default Student;
