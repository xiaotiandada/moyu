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
        host: '',
        port: '3306',
        user: 'test_user',
        password: 'test_password',
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

  return config;
};
