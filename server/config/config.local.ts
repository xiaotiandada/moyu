import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };

  // https://eggjs.org/zh-cn/tutorials/mysql.html
  config.mysql = {
    clients: {
      db1: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'xiaotian',
        database: 'test',
      },
    },
    // 所有数据库配置的默认值
    default: {
      multipleStatements: true,
      charset: 'utf8mb4',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.rabbitmq = {
    client: {
      url: 'amqp://guest:guest@localhost:5672',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  return config;
};