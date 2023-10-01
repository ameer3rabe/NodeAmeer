document.addEventListener('DOMContentLoaded', function () {
    const selectWorkers = document.getElementById('SelectWorkers');
    const checkinButton = document.getElementById('Checkin');
    const checkoutButton = document.getElementById('Checkout');

    function populateWorkerSelect() {
        fetch('/Workers/List')
            .then(response => response.json())
            .then(data => {
                data.forEach(worker => {
                    const option = document.createElement('option');
                    option.value = worker.id;
                    option.text = `${worker.first_name} ${worker.last_name}`;
                    selectWorkers.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching workers:', error);
            });
    }
    populateWorkerSelect();

    checkinButton.addEventListener('click', function () {
        const selectedWorkerId = selectWorkers.value;

        if (!selectedWorkerId) {
            console.error('Please select a worker.');
            return;
        }

        // Get the selected worker's name
        const selectedWorkerName = selectWorkers.options[selectWorkers.selectedIndex].text;

        fetch('/check/Entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                employee_id: selectedWorkerId,
                employee_name: selectedWorkerName,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Entry successful:', data.message);
            })
            .catch(error => {
                console.error('Error making entry:', error);
            });
    });

    checkoutButton.addEventListener('click', function () {
        const selectedWorkerName = selectWorkers.options[selectWorkers.selectedIndex].text;

        fetch('/check/Exit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: selectedWorkerName,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Exit successful:', data.message);
            })
            .catch(error => {
                console.error('Error making exit:', error);
            });
    });
});

