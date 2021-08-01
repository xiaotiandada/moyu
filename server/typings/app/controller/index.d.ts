// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAsync from '../../../app/controller/async';
import ExportHome from '../../../app/controller/home';
import ExportMq from '../../../app/controller/mq';
import ExportPtwxz from '../../../app/controller/ptwxz';

declare module 'egg' {
  interface IController {
    async: ExportAsync;
    home: ExportHome;
    mq: ExportMq;
    ptwxz: ExportPtwxz;
  }
}
