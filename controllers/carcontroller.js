const router = require('express').Router();
// const { carcontroller } = require('.');
const { models } = require('../models');

router.post('/car', async (req, res) => {
    const {year, make, model, VIN} = req.body.car;

    try{
        await models.CarModel.create({
            year: year,
            make: make,
            model: model,
            VIN: VIN,
            userID: req.user.id
        })
        .then(
            car => {
                res.status(201).json({
                    car: car,
                    message: 'vehicle listing created'
                });
            }
        )
    } catch (err) {
        res.status(201).json({
            car: this.car,
            message: 'vehicle created'
        });
    }
});

module.exports = router;