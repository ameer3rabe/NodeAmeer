let raw_data = [];

function CreateTable(data) {
    let str = "";
    for (let line of data) {
        str += "<tr>";
        str += "<td>" + line.employee_name + "</td>";
        const entryTime = new Date(line.entry_time).toLocaleString();
        const exitTime = new Date(line.exit_time).toLocaleString();
        str += "<td>" + entryTime + "</td>";
        str += "<td>" + exitTime + "</td>";
        str += "</tr>";
    }
    document.getElementById("entryExitTable").innerHTML = str;
}


async function GetList() {
    try {
        let response = await fetch('/display/List');
        let data = await response.json();
        raw_data = data;
        CreateTable(raw_data);
    } catch (error) {
        console.error('Error fetching entry/exit data:', error);
    }
}

async function loadEmployeeData() {
    const selectedEmployeeId = document.getElementById('SelectEmployee').value;
    const response = await fetch(`/display/List/${selectedEmployeeId}`);
    const data = await response.json();
    raw_data = data;
    CreateTable(raw_data);
}

async function populateEmployeeOptions() {
    const selectEmployee = document.getElementById('SelectEmployee');
    const response = await fetch('/Workers/List');
    const data = await response.json();

    selectEmployee.innerHTML = '';

    for (const employee of data) {
        const option = document.createElement('option');
        option.value = employee.id;
        option.textContent = `${employee.first_name} ${employee.last_name}`;
        selectEmployee.appendChild(option);
    }

    GetList();
}

populateEmployeeOptions();
