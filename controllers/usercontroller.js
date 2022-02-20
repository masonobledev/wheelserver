const router = require('express').Router();
const { models } = require('../models');
const bcrypt = require('bcryptjs');
const validateJWT = require('../middleware/validate-session');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');

/* Register==========================================================================*/
router.post('/register', async (req, res) =>{
    const {username, password, isAdmin} = req.body;

    try {
        const newUser = await models.UserModel.create({
            username, 
            password: bcrypt.hashSync(password, 10),
            isAdmin
        })
        console.log(newUser);

        let token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

        res.status(201).json({
            message: 'User Created!',
            user: newUser,
            sessionToken: token
        })
    } catch (err) {
        console.log(err);
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

/* Login=============================================================================*/
router.post("/login", async (req, res) => {
    const { username, password, isAdmin } = req.body;
    
    try {
         const findUser = await models.UserModel.findOne({ 
           where :  { username: req.body.username }
        });
        console.log(findUser)

        if (findUser) {
          const comparePassword = bcrypt.compare( password, findUser.password );
          console.log(comparePassword)

          if (comparePassword) {
            const token = jwt.sign({ id: findUser.id }, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            
            res.status(201).json({
                user: findUser,
                message: 'Login successful',
                sessionToken: `Bearer ${token}`
            });
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
});

/* Get all users=====================================================================*/
router.get('/allusers', async (req, res) => {
    try {
        await models.UserModel.findAll()
        .then(
            users => {
                res.status(200).json({
                    users: users,
                    message: "Success"
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            error: `Failed to retrieve users: ${err}`
        });
    };
});

/* Get one user======================================================================*/
router.get('/:id', async (req, res) => {
    const { id, username, password } = req.body
    
    try{
        const oneUser = await models.UserModel.findOne({ 
            where: { id: id } 
        });
        console.log(oneUser);

            res.status(201).json({
                user: oneUser,
                message: "Found user"
            });
        } catch (err) {
            res.status(500).json({
                error: `Failed to retrieve user: ${err}`
            })
    }
});

/* Update User=======================================================================*/
router.put ('/update', async (req, res) => {
    const { id, username, password } = req.body

    try{
        const updateUser = await models.UserModel.findOne({ 
            where: { id: id }
        });
        console.log(updateUser);

        updateUser.username = username
        updateUser.password = password
        
        await updateUser.save();

                res.status(200).json({
                    user: updateUser,
                    message: "Success"
                });
    } catch (err) {
        res.status(500).json({
            error: "Failed to update user"
        });
    }
});

/* Logout============================================================================*/
  router.delete('/logout', async (req, res) => {

    const { id /*sessionToken*/ } = req;

      try{
          const deleteUser = await models.UserModel.findOne({ 
              where: { id: id }
            });

        if (id /*&& sessionToken*/){
            await models.UserModel.destroy();
        };
                
           res.status(201).json({
            user: deleteUser,
            message: 'Success'
        });

      } catch (err) {
            res.status(400).json({
            message: "not authenticated",
            });
      }
  });
       
module.exports = router;