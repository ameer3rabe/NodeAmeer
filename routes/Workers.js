const express = require('express');
const router = express.Router();
module.exports = router;

router.post('/Add', (req, res) => {
    const { first_name, last_name, job_title } = req.body;

    const query = 'INSERT INTO employees (first_name, last_name, job_title) VALUES (?, ?, ?)';
    const values = [first_name, last_name, job_title];

    db_pool.query(query, values, (err, result) => {
        if (err) {
            console.error('Error adding employee:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(201).json({ message: 'Employee added successfully' });
    });
});
// Endpoint to retrieve all employees
router.get('/List', (req, res) => {
    const query = 'SELECT * FROM employees';

    db_pool.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving employees:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json(results);
    });
});

// Endpoint to update an employee by ID
router.put('/Update/:id', (req, res) => {
    const employeeId = req.params.id;
    const { first_name, last_name, job_title} = req.body;

    const query = 'UPDATE employees SET first_name = ?, last_name = ?, job_title = ? WHERE id = ?';
    const values = [first_name, last_name, job_title,employeeId];

    db_pool.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating employee:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Employee not found' });
        } else {
            res.json({ message: 'Employee updated successfully' });
        }
    });
});

// Endpoint to delete an employee by ID
router.delete('/Delete/:id', (req, res) => {
    const employeeId = req.params.id;

    const query = 'DELETE FROM employees WHERE id = ?';
    const values = [employeeId];

    db_pool.query(query, values, (err, result) => {
        if (err) {
            console.error('Error deleting employee:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Employee not found' });
        } else {
            res.json({ message: 'Employee deleted successfully' });
        }
    });
});


