const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

router.get('/jobs', candidateController.getJobs);
router.post('/apply', candidateController.applyForJob);

module.exports = router;
