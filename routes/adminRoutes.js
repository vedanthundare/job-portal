const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/add-job', adminController.addJob);
router.get('/list-jobs', adminController.listJobs);

module.exports = router;
