const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()

const pathApi = '/api/v1/'

app.use( express.urlencoded({extended:true}) );
app.use( express.json() );
app.use( cors() );

//ROUTES
const businessunitsRoutes = require('./routes/businessunits.routes');
const employeesRoutes = require('./routes/employees.routes');
const denominationsRoutes = require('./routes/denominations.routes');

//USE ROUTES
app.use( pathApi, businessunitsRoutes );
app.use( pathApi, employeesRoutes );
app.use(pathApi, denominationsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server UP corriendo en http://localhost:${process.env.PORT}`);
});
