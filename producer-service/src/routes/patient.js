const express = require('express');
const { publishMessages } = require('../amqp/publisher');
const { handleError } = require('../utils/errorhandler');

const router = express.Router();

// POST route to handle patient data
router.post('/send', async (req, res) => {
    const patientData = req.body;

    // Basic validation for the required field
    if (!patientData.id) {
        return res.status(400).json({ error: 'Patient ID is required' });
    }

    try {
        // Publish the patient data to RabbitMQ
        await publishMessages(patientData);

        res.status(200).json({ message: 'Patient data processing started', data: patientData });
    } catch (error) {
        handleError('processing patient data', error);
        res.status(500).json({ error: 'Failed to process patient data' });
    }
});

module.exports = router;
