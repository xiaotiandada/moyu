import { Service } from 'egg';

export default class MdService extends Service {
  public async producer() {
    console.log('producer start');

    const { app } = this.ctx;
    // you can access to connection and channel using app.rabbitmq.
    const { ch } = app.rabbitmq;
    const queueName = 'helloworldQueue';
    const msg = `hello world 123 ${Date.now()}`;

    try {
      // assertQueue
      await ch.assertQueue(queueName, { durable: true });
      // checkQueue
      await ch.checkQueue(queueName);
      // sendToQueue
      await ch.sendToQueue(queueName, Buffer.from(msg));
      // If you want to get a channel which uses "confirmation mode"
      // const confirmChannel = await conn.createConfirmChannel();
      // console.log('confirmChannel', confirmChannel);

      // await ch.close();
    } catch (e) {
      console.log(e);
      return {
        code: -1,
        message: e.toString(),
      };
    } finally {
      // await conn.close();
    }

    return 'success';
  }
  public async buy() {
    // 也许应该在这里利用Redis 完成条件的再进入队列。。。
    // 然后消费消息记录数据 排队写入防止爆库
    const { app } = this.ctx;
    const { ch } = app.rabbitmq;
    const queueName = 'buyQueue';
    const msg = {
      uid: Date.now(),
      actions: 'buy',
    };

    try {
      await ch.assertQueue(queueName, { durable: true });
      await ch.checkQueue(queueName);
      await ch.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
    } catch (e) {
      console.log(e);
      return {
        code: -1,
        message: e.toString(),
      };
    }

    return {
      code: 0,
    };
  }

  public async consumer() {
    console.log('consumer start');
    const { app } = this.ctx;
    const { ch } = app.rabbitmq;
    const queueName = 'helloworldQueue';

    let ok = ch.assertQueue(queueName, { durable: true });
    ok = ok.then(function(_qok: any) {
      console.log('_qok', _qok);
      return ch.consume(queueName, function(msg) {
        console.log(" [x] Received '%s'", msg.content.toString());
      }, { noAck: true });
    });

    return ok.then(function(_consumeOk: any) {
      console.log('_consumeOk', _consumeOk);
      console.log(' [*] Waiting for messages. To exit press CTRL+C');
    });
  }
  // 也不知道对不对 先做个demo
  // public async consumerBuy() {
  //   const { app } = this.ctx;
  //   const { ch } = app.rabbitmq;
  //   const queueName = 'buyQueue';

  //   let ok = ch.assertQueue(queueName, { durable: true });
  //   ok = ok.then(function(_qok: any) {
  //     console.log('_qok', _qok);
  //     return ch.consume(queueName, async function(msg) {
  //       const msgStr = msg.content.toString();

  //       // data
  //       const data = JSON.parse(msgStr);

  //       // count
  //       const count = await app.redis.get('count');
  //       console.log('count', count);
  //       if (Number(count) <= 0) {
  //         console.log('无库存');
  //       } else {
  //         const countNum = Number(count) - 1;
  //         await app.redis.set('count', countNum);
  //         console.log(`购买成功, 用户ID ${data.uid} 剩余 %s`, countNum);
  //       }
  //       ch.ack(msg);
  //     });
  //   });

  //   return ok.then(function(_consumeOk: any) {
  //     console.log('_consumeOk', _consumeOk);
  //     console.log(' [*] Waiting for messages. To exit press CTRL+C');
  //   });
  // }
}
