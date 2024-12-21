exports.getJobs = (req, res) => {
    const sql = 'SELECT * FROM jobs';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.applyForJob = (req, res) => {
    const { job_id, candidate_name, contact } = req.body;
    const sql = 'INSERT INTO applications (job_id, candidate_name, contact) VALUES (?, ?, ?)';
    db.query(sql, [job_id, candidate_name, contact], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Application submitted successfully!' });
    });
};
