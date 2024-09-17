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
        let queueName;
        switch (patientData.deviceType) {
            case 'heartbeat':
                queueName = 'heartbeat_queue';
                break;
            case 'temperature':
                queueName = 'temperature_queue';
                break;
            case 'bloodPressure':
                    queueName = 'bloodPressure_queue';
                    break;
            default:
                return res.status(400).json({ error: `Unsupported device type: ${patientData.deviceType}` });}
        await publishMessages(queueName, patientData);

        res.status(200).json({ message: 'Patient data processing started', data: patientData });
    } catch (error) {
        handleError('processing patient data', error);
        res.status(500).json({ error: 'Failed to process patient data' });
    }
});

module.exports = router;
