const router = require('express').Router();
const { models } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');

/* Register */
router.post('/register' , async (req, res) =>{
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

/* Login */
router.post("/login", async (req, res) => {
    const { username, password } = req.body
    let message
    try {
         const findUser = await User.findOne({ 
           where :  { username: req.body.username }
        });
        //console.log(findUser)
        if (findUser) {
          const comparePassword = bcrypt.compare( req.body.password, findUser.password );
          //console.log(comparePassword)
          if (comparePassword) {
            const token = jwt.sign({ id: findUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
            res.status(201).json({
                user: user,
                message: 'Login successful',
                sessionToken: `Bearer ${token}`
            });
            // message = {
            //   msg:'Login successful', 
            //   user: findUser, 
            //   sessionToken: token          
            // }

          }
        } else {
            res.status(500).json({
                message: 'Unauthorized',
            });
        }
      } catch (err) {
        res.status(500).json({
            message: 'Login failed',
        });
      }
      res.json(message)
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
       
module.exports = router;