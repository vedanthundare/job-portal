const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const chatRoutes = require('./routes/chatRoutes'); 
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vedant@2003", 
  database: "job_portal",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL Database:", err.message);
  } else {
    console.log("Connected to MySQL Database!");
  }
});

app.get("/api/jobs", (req, res) => {
  const sqlQuery = "SELECT * FROM jobs";
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching jobs:", err.message);
      return res.status(500).send("Error fetching jobs");
    }
    res.json(results);
  });
});

app.post("/api/apply", (req, res) => {
  const { jobId, candidateName, contact } = req.body;

  if (!jobId || !candidateName || !contact) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sqlQuery = "INSERT INTO job_applications (job_id, candidate_name, contact) VALUES (?, ?, ?)";
  db.query(sqlQuery, [jobId, candidateName, contact], (err, result) => {
    if (err) {
      console.error("Error submitting application:", err.message);
      return res.status(500).send("Error submitting application");
    }
    res.json({ message: "Application submitted successfully!" });
  });
});

app.post('/api/add-job', (req, res) => {
  const { title, description, location, salary, contact_email } = req.body;

  const query = 'INSERT INTO jobs (title, description, location, salary, contact_email) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, description, location, salary, contact_email], (err, result) => {
    if (err) {
      console.error('Error adding job:', err.message);
      return res.status(500).json({ error: 'Error adding job: ' + err.message });
    }
    res.status(201).json({ message: 'Job added successfully!' });
  });
});

app.put('/api/update-job/:id', (req, res) => {
  const jobId = req.params.id;
  const { title, description, location, salary, contact_email } = req.body;

  const query = 'UPDATE jobs SET title = ?, description = ?, location = ?, salary = ?, contact_email = ? WHERE id = ?';
  db.query(query, [title, description, location, salary, contact_email, jobId], (err, result) => {
    if (err) {
      console.error('Error updating job:', err.message);
      return res.status(500).json({ error: 'Error updating job: ' + err.message });
    }
    res.status(200).json({ message: 'Job updated successfully!' });
  });
});

app.use('/api/chat', chatRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', () => {
  db.end(err => {
    if (err) {
      console.error('Error closing the database connection:', err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});