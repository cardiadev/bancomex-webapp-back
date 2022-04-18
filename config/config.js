require('dotenv').config(); // this is important!
module.exports = {
"development": {
    "username": process.env.DEV_DATABASE_USERNAME,
    "password": process.env.DEV_DB_PASSWORD,
    "database": process.env.DEV_DB_NAME,
    "host": process.env.DEV_DATABASE_HOST,
    "dialect": process.env.DEV_DB_DIALECT
  },
"test": {
  "username": process.env.TEST_DATABASE_USERNAME,
  "password": process.env.TEST_DB_PASSWORD,
  "database": process.env.TEST_DB_NAME,
  "host": process.env.TEST_DATABASE_HOST,
  "dialect": process.env.TEST_DB_DIALECT
},
"production": {
  "username": process.env.PROD_DATABASE_USERNAME,
  "password": process.env.PROD_DB_PASSWORD,
  "database": process.env.PROD_DB_NAME,
  "host": process.env.PROD_DATABASE_HOST,
  "dialect": process.env.PROD_DB_DIALECT
}
};