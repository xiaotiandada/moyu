// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportTest from '../../../app/service/Test';
import ExportAsync from '../../../app/service/async';
import ExportMq from '../../../app/service/mq';
import ExportPtwxz from '../../../app/service/ptwxz';

declare module 'egg' {
  interface IService {
    test: AutoInstanceType<typeof ExportTest>;
    async: AutoInstanceType<typeof ExportAsync>;
    mq: AutoInstanceType<typeof ExportMq>;
    ptwxz: AutoInstanceType<typeof ExportPtwxz>;
  }
}
