// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportMq from '../../../app/controller/mq';
import ExportPtwxz from '../../../app/controller/ptwxz';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    mq: ExportMq;
    ptwxz: ExportPtwxz;
  }
}
