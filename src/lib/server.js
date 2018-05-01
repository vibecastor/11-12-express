'use strict';

import express from 'express';
import mongoose from 'mongoose';
import logger from 'logger';
import coffeeRoutes from '../route/coffee-route';

const app = express();
let server = null;

app.use(coffeeRoutes);

app.all('*', (request, response) => {
  logger.log(logger.INFO, 'Returning a 404 from the catch-all/default route');
  return response.sendStatus(404);
});

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
};import express from 'express';
import mongoose from 'mongoose';
import logger from 'logger';

const app = express();
let server = null;

app.all('*', )

const startServer = () => mongoose.connect(process.env.MONGODV_URI)
  .then(() => {
    // mongoose is now connected
    app.listen(process.env.PORT, () => {
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

export { startServer, stopServer }



export { startServer, stopServer };

