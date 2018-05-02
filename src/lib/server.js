'use strict';

import express from 'express';
import mongoose from 'mongoose';
import logger from '../lib/logger';
import coffeeRouter from '../route/coffee-route'; 
import loggerMiddleware from '../lib/logger-middleware';
import errorMiddleware from '../lib/error-middleware';

const app = express();
let server = null;
// (1) first middlewarre
app.use(loggerMiddleware); // Mike: you removed the logger.log's from the routes
// (2) then this one...
app.use(coffeeRouter);

app.all('*', (request, response) => {
  logger.log(logger.INFO, 'Returning a 404 from the catch-all/default route');
  return response.sendStatus(404);
});
// (3) Mike: this runs when .next in cofferRouter
app.use(errorMiddleware);

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      // mongoose is now connected
      server = app.listen(process.env.PORT, () => {
        logger.log(logger.INFO, `the server is listening on PORT ${process.env.PORT}`);
      });
    });
};

const stopServer = () => {
  return mongoose.disconnect()
    .then(() => {
      server.close(() => {
        logger.log(logger.INFO, 'Server is off');
      });
    });
};

export { startServer, stopServer };

