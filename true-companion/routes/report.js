const express = require('express');
const Report = require('../models/Report');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { reportedUser, reason } = req.body;
    const report = new Report({ reporter: req.user.userId, reportedUser, reason });
    await report.save();
    res.status(201).send('Report submitted');
  } catch (error) {
    res.status(400).send('Error submitting report');
}
});

module.exports = router;

   
