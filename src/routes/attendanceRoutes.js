const express = require('express');
const router = express.Router();
const controller = require('../controllers/attendanceController');

router.post('/attendance', controller.addEntry);
router.get('/attendance', controller.getEntries);
router.get('/attendance/today', controller.getTodayEntries);

module.exports = router;
