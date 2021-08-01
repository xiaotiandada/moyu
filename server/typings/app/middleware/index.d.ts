// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportSetHeader from '../../../app/middleware/setHeader';

declare module 'egg' {
  interface IMiddleware {
    setHeader: typeof ExportSetHeader;
  }
}
