require('dotenv').config();

// imports
const express = require('express');
const dbConnection = require('./db');
const controllers = require('./controllers');
const middleware = require('./middleware');

//instantiation
const app = express();

//middleware
app.use(middleware.CORS);
app.use(express.json());

//endpoints
app.use('/auth', controllers.usercontroller);
app.use('/car', controllers.carcontroller);
app.use('/work', controllers.workcontroller);
//app.use(middleware.validateSession);

//database auth & sync
//testing the connection
try {
    dbConnection
        .authenticate()
        .then(async () => await dbConnection.sync())
        //.then(async () => await dbConnection.sync( {force: true} ))
        // force: true will drop all tables in pgAdmin and resync them. This is necessary after you make a change to a model, and need to sync any new table headers to the database.
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log(`[SERVER]: App is listening on ${process.env.PORT}`);
            });
        });
} catch (err) {
    console.log('[SERVER]: Server crashed');
    console.log(err);
}