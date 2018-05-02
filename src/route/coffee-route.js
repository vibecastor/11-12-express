'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import Coffee from '../model/coffee';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();

const coffeeRouter = new Router();

coffeeRouter.post('/api/coffee', jsonParser, (request, response, next) => {
  if (!request.body.brand) {
    logger.log(logger.INFO, 'Responding with a 400 error code, no coffee brand');
    return next(new HttpErrors(400, 'brand is required'));
  }
  if (!request.body.origin) {
    logger.log(logger.INFO, 'Responding with a 400 error code, no coffee origin');
    return next(new HttpErrors(400, 'origin is required'));
  }
  if (!request.body.roast) {
    logger.log(logger.INFO, 'Responding with a 400 error code, no coffee roast');
    return next(new HttpErrors(400, 'roast is required'));
  }
  return new Coffee(request.body).save()
    .then((coffee) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code');
      return response.json(coffee);
    })
    .catch(next);
});

coffeeRouter.get('/api/coffee/:id', (request, response, next) => {
  return Coffee.findById(request.params.id)
    .then((coffee) => {
      if (!coffee) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code = (!coffee');
        return next(new HttpErrors(404, 'coffee not found'));
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(coffee);
    })
    .catch(next);
});

coffeeRouter.delete('/api/coffee/:id', (request, response, next) => {
  return Coffee.findByIdAndRemove(request.params.id)
    .then((coffee) => {
      if (!coffee.id) {
        logger.log(logger.INFO, 'DELETE - responding with a 400 status code - no ID');
        return next(new HttpErrors(400, 'brand is required'));
      }
      logger.log(logger.INFO, 'DELETED a coffee');
      return next(new HttpErrors(204, 'Deleted a coffee'));
    })
    .catch(next);
});

export default coffeeRouter;
