const router = require('express').Router();
const { models } = require('../models');
const validateJWT = require('../middleware/validate-session');
const { user } = require('pg/lib/defaults');

/* Create vehicle */
router.post('/new', validateJWT, async (req, res) => {
    const {year, make, model, VIN} = req.body.car;
    const { id } = req.user;

    try{
        const existingUser = await models.UserModel.findOne({ 
             where: { id }
         });
        console.log(existingUser)
        
         if (existingUser) {
             const newCar = await models.CarModel.create({
                 year: year,
                 make: make,
                 model: model,
                 VIN: VIN,
                 userID: existingUser.id
                });
                
                res.status(201).json({
                    car: newCar,
                    message: 'Shiny new car!'
                });

            } else {
                res.status(500).json({
                    message: 'Unauthorized',
                });
            }

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