import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/add', controller.home.add);
  router.get('/remove', controller.home.remove);
  router.get('/fetchPosts', controller.home.fetchPosts);
  router.post('/signIn', controller.home.signIn);
  router.post('/api/producer', controller.mq.producer);
  // 第一次了解 rabbitmq
  // redis 存 x 数量去抢，每抢一次加入队列一次 最后消费所有队列
  // router.post('/api/buy', controller.mq.buy);

  // 小说 www.ptwxz.com
  router.get('/ptwxz', controller.ptwxz.index);
  router.get('/ptwxz/detail', controller.ptwxz.get);

};
