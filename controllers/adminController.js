const db = require('../models/db');

exports.addJob = (req, res) => {
    const { title, description, location, salary, contact_email } = req.body;
    const sql = 'INSERT INTO jobs (title, description, location, salary, contact_email) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [title, description, location, salary, contact_email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Job added successfully!' });
    });
};

exports.listJobs = (req, res) => {
    const sql = 'SELECT * FROM jobs';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
