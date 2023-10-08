class Student {
    constructor(_name, balance) {
        this._name = _name;
        this.balance = balance;
        this._id = ++Student.studentCount;
        this.courses = [];
    }
    enroll(course) {
        this.courses.push(course);
    }
    viewBalance() {
        return this.balance.toString();
    }
    payTuition(amount) {
        this.balance -= amount;
    }
    showStatus() {
        console.log(`Student ID: ${this._id}\nName: ${this._name}\nCourses Enrolled: ${this.courses.join(', ')}\nBalance: $${this.balance}`);
    }
    updateBalance(balance) {
        this.balance += balance;
    }
    get name() {
        return this._name;
    }
    get id() {
        return this._id;
    }
}
Student.studentCount = 10000;
export default Student;
