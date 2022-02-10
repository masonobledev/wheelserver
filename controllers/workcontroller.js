const router = require('express').Router();
const validateJWT = require('../middleware/validate-session');
const { models } = require('../models');

router.post('/work', validateJWT, async (req, res) => {

    const {date, mileage, notes, carID} = req.body.work;

    try {
        await models.WorkModel.create({
            date: date,
            mileage: mileage,
            notes: notes,
            carID: carID,
            // userID: req.user.id
        })
        .then(
            comment => {
                res.status(201).json({
                    work: work,
                    message: 'job created'
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            error: 'Failed to create job: ${err}'
        });
    };
});

module.exports = router;