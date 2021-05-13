/// <reference types="react-scripts" />

import { ICacheLike } from 'axios-extensions';
declare module 'axios' {
  interface AxiosRequestConfig {
    // if your cacheFlag was setting to 'useCache'
    useCache?: boolean | ICacheLike<any>;
  }
}