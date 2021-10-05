/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

process.on('uncaughtException', err => { // in case of some wrong syntax we'll throw an error with shutDown of the Application
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DataBase Connected Successfully!'));

///////////-----------SERVER - PORT--------///////////
const port = process.env.PORT || 3000;
const server = app.listen(port, () => { // this const was created to handle the unhandled error in which we need to shut Down the application. by first closing the server
  console.log(`Natours Started listening on port ${port}...`);
});

// process to kill the server
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});