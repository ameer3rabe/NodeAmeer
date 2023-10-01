const express = require('express');
const router = express.Router()
module.exports = router;

router.post('/Entry', (req, res) => {
    const { employee_id, employee_name } = req.body;
    const entry_time = new Date().toISOString();

    const query = 'INSERT INTO entry_exit (employee_id, employee_name, entry_time, exit_time) VALUES (?, ?, ?, null)';
    const values = [employee_id, employee_name, entry_time];

    db_pool.query(query, values, (err, result) => {
        if (err) {
            console.error('Error making an entry:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(201).json({ message: 'Entry made successfully' });
    });
});


router.post("/Exit", (req, res) => {
    let { name } = req.body;
    let exit_time = new Date().toISOString();
    let query = `UPDATE entry_exit
                 SET exit_time = ?
                 WHERE employee_name = ? AND exit_time IS NULL`;

    let values = [exit_time, name];

    db_pool.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating exit time:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ message: "No matching entry found or entry already has an exit time" });
        } else {
            res.status(200).json({ message: "Clock out successfully" });
        }
    });
});


