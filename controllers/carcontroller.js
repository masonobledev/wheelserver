const router = require('express').Router();
const { models } = require('../models');
const validateJWT = require('../middleware/validate-session');

/* Create vehicle */
router.post('/car', validateJWT, async (req, res) => {
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
                    message: 'Shiny new car!'
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            message: 'try again!'
        });
    }
});

/* Get all cars */
router.get("/", async (req, res) => {
    
    try {
        await models.CarModel.findAll();
        then(
            allCars => {
                res.status(200).json({
                    allCars: allCars
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            message: 'try again!'
        });
    }
});

/* Get car by id */
router.get("/byid", async (req, res) => {

    try{
        await models.CarModel.findOne({ where: {userid: req.body.userid} });
        then(
            myCar => {
                res.status(200).json({
                    myCar: myCar
                });
            }
        );
    } catch (err) {
        res.status(500).json({
            message: 'nope!'
        });
    }
});

/* Update vehicle */
router.put("/:uuid", async (req, res) => {
    
        const uuid = req.params.uuid
        const { year, make, model, VIN } = req.body
      
        try {
            const whip = await models.CarModel.findOne({ where: { uuid } });
        
                this.whip.year = year
                this.whip.make = make
                this.whip.model = model
                this.whip.VIN = VIN
        
              await whip.save()
        
            .then(
                res.status(200).json({
                    whip: whip
                })
            );
        } catch (err) {
            res.status(500).json({
                message: 'nope!'
            });
        }
});
        
        
   
      


module.exports = router;