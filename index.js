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
const casscutoffRoutes = require('./routes/cashcutoff.routes');
const cashboxesRoutes = require('./routes/cashboxes.routes');
const chargesRoutes = require('./routes/charges.routes');
const branchRoutes = require('./routes/branch.routes');
const denominationcashRoutes = require('./routes/denominationcash.routes');
const cardsRoutes = require ('./routes/cards.routes');
const guaranteesRouter = require('./routes/gurantees.routes');


//USE ROUTES
app.use( pathApi, businessunitsRoutes );
app.use( pathApi, employeesRoutes );
app.use(pathApi, denominationsRoutes);
app.use( pathApi, casscutoffRoutes );
app.use( pathApi, cashboxesRoutes);
app.use( pathApi, chargesRoutes);
app.use( pathApi, branchRoutes);
app.use( pathApi, denominationcashRoutes);
app.use(pathApi,cardsRoutes);
app.use (pathApi, guaranteesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server UP corriendo en http://localhost:${process.env.PORT}`);
});
