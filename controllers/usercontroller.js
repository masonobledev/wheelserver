const router = require('express').Router();
const { models } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');

/* Register */
router.post('/signup' , async (req, res) =>{
    const {username, password} = req.body.user;
    try {
        await models.UserModel.create({
            username: username,
            password: bcrypt.hashSync(password, 10)
        })
        .then(
            user => {
                let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                res.status(201).json({
                    user: user,
                    message: 'user created',
                    sessionToken: 'Bearer ${token}'
                });
            }
        )
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({ 
                message: 'Username already in use'
            });
        } else {
            res.status(500).json({
                error: `Failed to register user: ${err}`
            });
        };
    };
});

/* Get all users */
router.get('/userinfo', async (req, res) => {
    try {
        await models.UserModel.findAll()
        .then(
            users => {
                res.status(200).json({
                    users: users
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            error: `Failed to retrieve users: ${err}`
        });
    };
});

// /* Logout */
// router.delete('/:uuid', async (req, res) => {
//     const uuid = req.params.uuid
//     try {
//         const user = await models.UserModel.findOne({ where: { uuid } })
//         .then(await user.destroy() => {
//                 message = {
//                   msg: 'Successfully logged out'
//                 };
//             });
//         } catch (err) {
//                         console.log(err);
//                         message = {
//                           msg: 'Logout failed'
//                         }
//                     }
//                     res.json(message)
                
//                 });
        
module.exports = router;