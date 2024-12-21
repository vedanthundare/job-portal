const db = require('../models/db'); 

exports.chatbot = async (req, res) => {
  const { query } = req.body; 

  if (!query) {
    return res.status(400).json({ error: "Query is required." });
  }

  try {
    if (query.toLowerCase().includes("jobs")) {
      const jobs = await getJobsFromDatabase(); 
      if (jobs.length > 0) {
        const jobTitles = jobs.map(job => job.title).join(', ');
        return res.json({ response: `Here are the available jobs: ${jobTitles}` });
      } else {
        return res.json({ response: "There are currently no jobs available." });
      }
    }

    const jobIdMatch = query.match(/job id (\d+)/i);
    if (jobIdMatch) {
      const jobId = jobIdMatch[1];
      const jobDetails = await getJobDetails(jobId);
      if (jobDetails) {
        return res.json({ response: `Job Title: ${jobDetails.title}, Description: ${jobDetails.description}, Location: ${jobDetails.location}, Salary: ${jobDetails.salary}` });
      } else {
        return res.json({ response: "Job not found." });
      }
    }

    return res.json({ response: "I'm sorry, I can only provide information about jobs." });

  } catch (error) {
    console.error("Database Query Error:", error.message); 
    return res.status(500).json({ error: "Failed to fetch a response. Please try again later." });
  }
};

const getJobsFromDatabase = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT title FROM jobs'; 
    db.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const getJobDetails = (jobId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM jobs WHERE id = ?'; 
    db.query(sql, [jobId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]); 
    });
  });
};