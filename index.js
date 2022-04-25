const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const pathApi = "/api/v1/";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//ROUTES
const businessunitsRoutes = require("./routes/businessunits.routes");
const employeesRoutes = require("./routes/employees.routes");
const casscutoffRoutes = require("./routes/cashcutoff.routes");
const cashboxesRoutes = require("./routes/cashboxes.routes");
const chargesRoutes = require("./routes/charges.routes");
const branchRoutes = require("./routes/branch.routes");
const denominationcashRoutes = require("./routes/denominationcash.routes");
const cardsRoutes = require("./routes/cards.routes");
const guaranteesRouter = require("./routes/gurantees.routes");
const replacementsRoutes = require("./routes/replacements.routes");
const accountsRoutes = require("./routes/accounts.routes");
const beneficiariesRoutes = require("./routes/beneficiaries.routes");
const propertiesRoutes = require("./routes/properties.routes");
const transactionsRoutes = require("./routes/transactions.routes");
const clientRoutes = require("./routes/clients.routes");
const creditRoutes = require("./routes/credit.routes");

//USE ROUTES
app.use(pathApi, businessunitsRoutes);
app.use(pathApi, employeesRoutes);
app.use(pathApi, casscutoffRoutes);
app.use(pathApi, cashboxesRoutes);
app.use(pathApi, chargesRoutes);
app.use(pathApi, branchRoutes);
app.use(pathApi, denominationcashRoutes);
app.use(pathApi, cardsRoutes);
app.use(pathApi, guaranteesRouter);
app.use(pathApi, replacementsRoutes);
app.use(pathApi, accountsRoutes);
app.use(pathApi, beneficiariesRoutes);
app.use(pathApi, propertiesRoutes);
app.use(pathApi, transactionsRoutes);
app.use(pathApi, clientRoutes);
app.use(pathApi, creditRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server UP corriendo en http://localhost:${process.env.PORT}`);
});
