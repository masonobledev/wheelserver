const router = require('express').Router();
const { models } = require('../models');
const validateJWT = require('../middleware/validate-session');
const res = require('express/lib/response');
const Car = require('../models/car');

/* Create vehicle================================================= */
// router.post('/new', async (req, res) => {

//     const { userId, body } = req.body

//     try{
//         await models.UserModel.findOne({ where: { id: userId } })
//         await models.CarModel.create({ body, userId: id })
//         .then(
//             // car => {
//             newCar => {    
//                 res.status(201).json({
//                     car: newCar,
//                     message: `success`
//                 });
//             }
//         )
//     } catch (err) {
//         res.status(500).json({
//             message: `unsuccessful`
//         });

//     }
// });
/*=========================================================================*/
/* Create vehicle */
// router.post("/new", validateJWT, async (req, res) => {
//     const { year, make, model, VIN } = req.body.cars;
//     const userId = req.params.id;

//     try{
//         await models.UserModel.findOne({ where: {id: userId} });
//         await models.CarModel.create({
//             year,
//             make,
//             model,
//             VIN,
//             userId,
//         }).then((post) => {
//                 res.status(201).json({
//                     post: post,
//                     message: 'new vehicle listing!'
//                 });
//             }
//         );
//     } catch (err) {
//         res.status(500).json({
//             error: 'Sorry--try again!'
//         });
//     }
// });
/* Create vehicle==========================================================*/
router.post('/new', validateJWT, (req, res) => {
    const newCar = {
        year: req.body.CarModel.year,
        make: req.body.CarModel.make,
        model: req.body.CarModel.model,
        VIN: req.body.CarModel.VIN
    };
    models.CarModel.create(newCar)
    .then((CarModel) => res.status(200).json(CarModel))
    .catch((err) => res.status(500).json({ error: err }));
})
/* Get all cars============================================================*/
router.get("/", async (req, res) => {
    
    //const cars = await models.CarModel.findAll();
    try {
        const cars = await models.CarModel.findAll();
        res.status(200).json({
            allCars: cars,
            message: "Success"
        });
    } catch (err) {
        res.status(500).json({
            message: 'try again!'
        });
    }
});

/* Get car by id============================================================*/
router.get("/:id", /*validateJWT*/ async (req, res) => {

    try{
        var car = await models.CarModel.findOne({ where: { id: req.body.id } });
        res.status(200).json({
            myCar: car,
            message: "Success"
        });
        // then(
        //     myCar => {
        //         res.status(200).json({
        //             myCar: myCar
        //         });
        //     }
        // );
    } catch (err) {
        res.status(500).json({
            message: 'nope!'
        });
    }
});

/* Update vehicle===============================================================*/
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