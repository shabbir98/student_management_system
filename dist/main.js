#! /usr/bin/env node
import inquirer from 'inquirer';
import Student from './student.js';
const students = [];
async function main() {
    while (true) {
        const choice = await showMenu();
        switch (choice) {
            case '1':
                await addStudent();
                break;
            case '2':
                await enrollStudent();
                break;
            case '3':
                await viewBalance();
                break;
            case '4':
                await payTuition();
                break;
            case '5':
                await updateBalance();
                break;
            case '6':
                await studentStatus();
                break;
            case '7':
                return;
            default:
                console.log('Invalid choice.');
        }
    }
}
async function showMenu() {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Select an option',
            choices: [
                '1. Add Student',
                '2. Enroll Student',
                '3. View Balance',
                '4. Pay Tuition',
                '5. Update Student Balance',
                '6. Show Student Status',
                '7. Exit',
            ],
        },
    ]);
    return choice.split('.')[0].trim();
}
async function addStudent() {
    const studentName = await getInput('Enter student name:');
    const yourBalance = parseFloat(await getInput('Enter your balance:'));
    const student = new Student(studentName, yourBalance);
    students.push(student);
    console.log(`Student ${student.name} added with ID ${student.id} with current balance $${student.viewBalance()}`);
}
async function enrollStudent() {
    const student = await selectStudent();
    if (student) {
        const courseToEnroll = await getInput('Enter the course to enroll in:');
        student.enroll(courseToEnroll);
        console.log(`Student ${student.name} enrolled in ${courseToEnroll}`);
    }
}
async function viewBalance() {
    const studentWithBalance = await selectStudent();
    if (studentWithBalance)
        console.log(`$${studentWithBalance.viewBalance()}`);
}
async function payTuition() {
    const studentToPay = await selectStudent();
    if (studentToPay) {
        const tuitionAmount = parseFloat(await getInput('Enter the amount to pay for tuition:'));
        studentToPay.payTuition(tuitionAmount);
        console.log(`${studentToPay.name} paid $${tuitionAmount} for tuition fees.`);
    }
}
async function studentStatus() {
    const showStatus = await selectStudent();
    if (showStatus)
        showStatus.showStatus();
}
async function updateBalance() {
    const updateAmountForStudent = await selectStudent();
    if (updateAmountForStudent) {
        const updateAmount = parseFloat(await getInput('Enter the amount to be added to the current balance:'));
        updateAmountForStudent.updateBalance(updateAmount);
        console.log(`$${updateAmount} has been added to ${updateAmountForStudent.name}'s current balance and the total balance is now $${updateAmountForStudent.viewBalance()}`);
    }
}
async function getInput(message) {
    const { input } = await inquirer.prompt([
        {
            type: 'input',
            name: 'input',
            message,
        },
    ]);
    return input;
}
async function selectStudent() {
    const studentNames = students.map((student) => student.name);
    const { selectedStudent } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedStudent',
            message: 'Select a student',
            choices: studentNames,
        },
    ]);
    const selected = students.find((student) => student.name === selectedStudent);
    if (!selected) {
        console.log('Student not found.');
        return undefined;
    }
    return selected;
}
main();
