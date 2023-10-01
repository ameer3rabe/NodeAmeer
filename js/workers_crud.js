function addNewEmployee() {
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const jobTitle = document.getElementById('job_title').value;

    const newEmployee = {
        first_name: firstName,
        last_name: lastName,
        job_title: jobTitle
    };

    fetch('/Workers/Add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
    })
    fetchEmployeeList();
}
function deleteEmployee() {
    const employeeId = document.getElementById('employee_id').value;

    // Make a DELETE request to delete the employee by ID
    fetch(`/Workers/Delete/${employeeId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response, e.g., display a success message
            console.log(data.message);
            // Refresh the employee list
            fetchEmployeeList();
        })
        .catch(error => {
            console.error('Error deleting employee:', error);
        });
}
function editEmployee() {
    const employeeId = document.getElementById('edit_employee_id').value;
    const firstName = document.getElementById('edit_first_name').value;
    const lastName = document.getElementById('edit_last_name').value;
    const jobTitle = document.getElementById('edit_job_title').value;

    const updatedEmployee = {
        first_name: firstName,
        last_name: lastName,
        job_title: jobTitle
    };
    fetch(`/Workers/Update/${employeeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEmployee)
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response, e.g., display a success message
            console.log(data.message);
            // Refresh the employee list
            fetchEmployeeList();
        })
        .catch(error => {
            console.error('Error updating employee:', error);
        });
}

function fetchEmployeeList() {
    fetch('http://localhost:7575/workers/List')
        .then(response => response.json())
        .then(data => {
            const employeeList = document.getElementById('mainTable');

            employeeList.innerHTML = '';
            data.forEach(employee => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${employee.id}</td>
                    <td>${employee.first_name}</td>
                    <td>${employee.last_name}</td>
                    <td>${employee.job_title}</td>
                `;
                employeeList.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching employee list:', error);
        });
}

fetchEmployeeList();
