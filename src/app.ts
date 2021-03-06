/**
 * @author DuyTM
 * @module app
 * @description config all application
 * @since 2018-03-21
 */

import {Server} from 'http';
import * as http from 'http';
import * as express from 'express';
import * as signale from 'signale';

import APP_CONFIG from './configs/app.config';

import databaseConfig from './configs/database';
import configExpress from './configs/express.config';
import configServer from './configs/server.config';
import registerRoutes from './configs/router.config';
import bootstrapConfig from './configs/bootstrap.config';
import setUpJobSchedule from './configs/cronJob.config';

const app = express();

databaseConfig();       // config connect db (mongodb & redis)
configExpress(app);     // config express app
registerRoutes(app);    // config register router
bootstrapConfig();      // load bootstrapping config
setUpJobSchedule();     // init job schedule

const server: Server = http.createServer(app);
configServer(server);
server.listen(APP_CONFIG.ENV.APP.PORT, () => {
  const serverAddress: any = server.address();
  signale.success(`Server's running at: ${serverAddress.address}/${serverAddress.port}`);
});

export default app;
