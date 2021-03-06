'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import Coffee from '../model/coffee';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();

const coffeeRouter = new Router();

coffeeRouter.post('/api/coffee', jsonParser, (request, response) => {
  logger.log(logger.INFO, 'POST - processing a request');
  if (!request.body.brand) {
    logger.log(logger.INFO, 'Responding with a 400 error code, no coffee brand');
    return response.sendStatus(400);
  }
  if (!request.body.origin) {
    logger.log(logger.INFO, 'Responding with a 400 error code, no coffee origin');
    return response.sendStatus(400);
  }
  if (!request.body.roast) {
    logger.log(logger.INFO, 'Responding with a 400 error code, no coffee roast');
    return response.sendStatus(400);
  }
  return new Coffee(request.body).save()
    .then((coffee) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code');
      return response.json(coffee);
    })
    .catch((error) => {
      logger.log(logger.ERROR, '__POST_ERROR__');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

coffeeRouter.get('/api/coffee/:id', (request, response) => {
  logger.log(logger.INFO, 'GET - processing a request');
  return Coffee.findById(request.params.id)
    .then((coffee) => {
      if (!coffee) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code = (!coffee');
        return response.sendStatus(404);
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(coffee);
    })
    .catch((error) => {
      if (error.message.toLowerCase().indexOf('cast to object id failed') > -1) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - objectId');
        logger.log(logger.VERBOSE, `Could not parse the specific object id ${request.params.id}`);
        return response.sendStatus(404);
      }
      logger.log(logger.ERROR, '__GET_ERROR__Returning a 500 status code');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

coffeeRouter.delete('/api/coffee/:id', (request, response) => {
  logger.log(logger.INFO, 'DELETE - processing a request');
  return Coffee.findByIdAndRemove(request.params.id)
    .then((coffee) => {
      if (!coffee.id) {
        logger.log(logger.INFO, 'DELETE - responding with a 400 status code - no ID');
        return response.sendStatus(400);
      }
      logger.log(logger.INFO, 'DELETED a coffee');
      return response.sendStatus(204);
    })
    .catch((error) => {
      logger.log(logger.ERROR, '__POST_ERROR__');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

export default coffeeRouter;
