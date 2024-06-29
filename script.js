// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

/**
 * Collect Employees
 * @return {Array<{firstName: string, lastName: string, salary: number}>}
 * @description
 * Function to collect all employees data
 */
function collectEmployees() {
    const employees = [];

    do {
        const firstName = prompt("Enter the employee's first name:");
        const lastName = prompt("Enter the employee's last name:");
        const salaryStr = prompt("Enter the employee's salary:");
        const salary = isNaN(salaryStr) ? 0 : parseFloat(salaryStr);

        employees.push({ firstName, lastName, salary });
    } while (confirm("Would you like to add another employee?"));

    return employees;
}

/**
 * Display Average Salary
 * @param {Array<{firstName: string, lastName: string, salary: number}>} employeesArray
 * @returns {number}
 * @description
 * Function to display the average salary in the format:
 * 'The average employee salary between our ${employeesArray.length} employee(s) is $${average.toFixed(2)}'
 * Returns the average salary
 */
function displayAverageSalary(employeesArray) {
    const salaries = employeesArray.map((employee) => (employee.salary));
    const average = (salaries.reduce((a, b) => (a + b), 0)) / salaries.length;
    const str = `The average employee salary between our ${employeesArray.length} employee(s) is $${average.toFixed(2)}`;
    console.log(str);
    return average;
}

/**
 * Get Random Employee
 * @param {Array<{firstName: string, lastName: string, salary: number}>} employeesArray
 * @returns {{firstName: string, lastName: string, salary: number}}
 * @description
 * Function to log a random employee with the following formatting:
 * 'Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winner!'
 * Returns a random employee object
 */
function getRandomEmployee(employeesArray) {
    const randomEmployee = employeesArray[Math.floor(Math.random() * employeesArray.length)];
    const str = `Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winner!`;
    console.log(str);
    return randomEmployee;
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
    // Get the employee table
    const employeeTable = document.querySelector('#employee-table');

    // Clear the employee table
    employeeTable.innerHTML = '';

    // Loop through the employee data and create a row for each employee
    for (let i = 0; i < employeesArray.length; i++) {
        const currentEmployee = employeesArray[i];

        const newTableRow = document.createElement("tr");

        const firstNameCell = document.createElement("td");
        firstNameCell.textContent = currentEmployee.firstName;
        newTableRow.append(firstNameCell);

        const lastNameCell = document.createElement("td");
        lastNameCell.textContent = currentEmployee.lastName;
        newTableRow.append(lastNameCell);

        const salaryCell = document.createElement("td");
        // Format the salary as currency
        salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        });

        newTableRow.append(salaryCell);

        employeeTable.append(newTableRow);
    }
}

const trackEmployeeData = function () {
    const employees = collectEmployees();

    console.table(employees);

    displayAverageSalary(employees);

    console.log('==============================');

    getRandomEmployee(employees);

    employees.sort(function (a, b) {
        if (a.lastName < b.lastName) {
            return -1;
        } else {
            return 1;
        }
    });

    displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
