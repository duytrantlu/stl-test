/**
 * @module router-config
 * @description config router
 *  * api
 *  * static file
 * @author DuyTM
 * @version 1.0.0
 */

import * as express from 'express';
import * as signale from 'signale';
import * as glob from 'glob';
import * as path from 'path';
import * as chalk from 'chalk';

import APP_CONFIG from './app.config';
import { route } from '../configs/common/routingCore';
import { AppConst } from '../common/consts/app.const';
import { Environment } from './common/models';

let swaggerJson = {};
if ([Environment.production, Environment.test, Environment.local].indexOf(APP_CONFIG.ENV.NAME as Environment) === -1) {
  swaggerJson = require('../../dist/document/swagger.json');
}

/**
 * @method registerRoutes
 * @description register router application
 * @param {e.Express} app
 */
export default function (app: express.Express) {
  const routes = glob.sync(path.normalize(`${ APP_CONFIG.ROOT }/api/**/*.route.{ts,js}`));
  // basic router ******
  app.get('/swagger.json', (req: express.Request, res: express.Response) => {
    return res.send(swaggerJson);
  });
  app.use('/coverage', express.static(path.join(__dirname, '../../coverage')));

  // api router ********
  routes.forEach((route) => {
    const routerChild = require(route).default;
    if (routerChild) signale.complete(chalk.default
      .yellow(`Router "/${ AppConst.API_PREFIX }/${ AppConst.API_VERSION }/${ routerChild }" has been registered!`));
  });
  app.get('/', function (req, res) {
    return res.json({ message: 'Welcome to Setel4 Order Service' });
  });
  app.use(`/${ AppConst.API_PREFIX }/${ AppConst.API_VERSION }`, route);
}
