import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  ratelimiter: {
    enable: false,
    package: 'egg-ratelimiter',
  },
  redis: {
    enable: false,
    package: 'egg-redis',
  },
  mysql: {
    enable: false,
    package: 'egg-mysql',
  },
  xtransit: {
    enable: false,
    package: 'egg-xtransit',
  },
  alinode: {
    enable: false,
    package: 'egg-alinode',
  },
  rabbitmq: {
    enable: false,
    package: '@eggplugin/rabbitmq',
  },
};

export default plugin;
